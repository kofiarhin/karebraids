const request = require("supertest");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");
const app = require("../app");

jest.mock("../models/Booking", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findOne: jest.fn(),
}));

const adminEnv = {
  NODE_ENV: "test",
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "correct-password",
  JWT_SECRET: "test-secret",
};

const validPayload = {
  service: "Knotless Braids",
  date: "2030-01-07",
  time: "10:00",
  fullName: "Amara Okafor",
  email: "amara@example.com",
  phone: "07123456789",
  preferredLocation: "Salon",
  notes: "Waist length if possible",
  status: "confirmed",
};

function adminToken() {
  return jwt.sign({ sub: "admin", role: "admin" }, "test-secret", {
    expiresIn: "8h",
  });
}

function authed(requestBuilder) {
  return requestBuilder.set("Authorization", `Bearer ${adminToken()}`);
}

describe("admin booking API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ...adminEnv };
    jest.resetAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("rejects booking list requests without admin auth", async () => {
    const response = await request(app).get("/api/admin/bookings");

    expect(response.status).toBe(401);
    expect(Booking.find).not.toHaveBeenCalled();
  });

  it("lists bookings for authenticated admins", async () => {
    const lean = jest.fn().mockResolvedValue([{ _id: "booking-1", ...validPayload }]);
    const sort = jest.fn().mockReturnValue({ lean });
    Booking.find.mockReturnValue({ sort });

    const response = await authed(request(app).get("/api/admin/bookings"));

    expect(response.status).toBe(200);
    expect(response.body.bookings).toHaveLength(1);
    expect(sort).toHaveBeenCalledWith({ date: 1, time: 1, createdAt: -1 });
  });

  it("creates a booking with admin-selected status", async () => {
    Booking.findOne.mockResolvedValue(null);
    Booking.create.mockResolvedValue({ _id: "booking-1", ...validPayload });

    const response = await authed(request(app).post("/api/admin/bookings")).send(validPayload);

    expect(response.status).toBe(201);
    expect(response.body.booking.status).toBe("confirmed");
    expect(Booking.create).toHaveBeenCalledWith(
      expect.objectContaining({
        service: "Knotless Braids",
        status: "confirmed",
      }),
    );
  });

  it("rejects duplicate slots on admin create", async () => {
    Booking.findOne.mockResolvedValue({ _id: "existing" });

    const response = await authed(request(app).post("/api/admin/bookings")).send(validPayload);

    expect(response.status).toBe(409);
    expect(response.body.message).toMatch(/already booked/i);
    expect(Booking.create).not.toHaveBeenCalled();
  });

  it("updates booking details and excludes the current booking from duplicate checks", async () => {
    Booking.findOne.mockResolvedValue(null);
    Booking.findByIdAndUpdate.mockResolvedValue({
      _id: "booking-1",
      ...validPayload,
      status: "completed",
    });

    const response = await authed(request(app).put("/api/admin/bookings/booking-1")).send({
      ...validPayload,
      status: "completed",
    });

    expect(response.status).toBe(200);
    expect(response.body.booking.status).toBe("completed");
    expect(Booking.findOne).toHaveBeenCalledWith({
      service: "Knotless Braids",
      date: "2030-01-07",
      time: "10:00",
      _id: { $ne: "booking-1" },
    });
  });

  it("rejects unsupported admin booking statuses", async () => {
    const response = await authed(request(app).post("/api/admin/bookings")).send({
      ...validPayload,
      status: "archived",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/status/i);
    expect(Booking.create).not.toHaveBeenCalled();
  });

  it("updates only booking status", async () => {
    Booking.findByIdAndUpdate.mockResolvedValue({
      _id: "booking-1",
      ...validPayload,
      status: "cancelled",
    });

    const response = await authed(
      request(app).patch("/api/admin/bookings/booking-1/status"),
    ).send({ status: "cancelled" });

    expect(response.status).toBe(200);
    expect(response.body.booking.status).toBe("cancelled");
    expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(
      "booking-1",
      { status: "cancelled" },
      { new: true, runValidators: true },
    );
  });

  it("deletes a booking", async () => {
    Booking.findByIdAndDelete.mockResolvedValue({ _id: "booking-1" });

    const response = await authed(request(app).delete("/api/admin/bookings/booking-1"));

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted/i);
  });

  it("returns 404 when deleting a missing booking", async () => {
    Booking.findByIdAndDelete.mockResolvedValue(null);

    const response = await authed(request(app).delete("/api/admin/bookings/missing"));

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/not found/i);
  });
});
