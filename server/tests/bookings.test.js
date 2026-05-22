const request = require("supertest");
const Booking = require("../models/Booking");
const app = require("../app");

jest.mock("../models/Booking", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
}));

const validPayload = {
  service: "Knotless Braids",
  date: "2030-01-07",
  time: "10:00",
  fullName: "Amara Okafor",
  email: "amara@example.com",
  phone: "07123456789",
  preferredLocation: "Salon",
  notes: "Waist length if possible",
};

describe("booking API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("creates a valid booking", async () => {
    Booking.findOne.mockResolvedValue(null);
    Booking.create.mockResolvedValue({ _id: "booking-1", ...validPayload });

    const response = await request(app).post("/api/bookings").send(validPayload);

    expect(response.status).toBe(201);
    expect(response.body.booking).toEqual(
      expect.objectContaining({
        service: "Knotless Braids",
        date: "2030-01-07",
        time: "10:00",
      }),
    );
    expect(Booking.create).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: "Amara Okafor",
        preferredLocation: "Salon",
      }),
    );
  });

  it("rejects Sunday bookings", async () => {
    const response = await request(app)
      .post("/api/bookings")
      .send({ ...validPayload, date: "2030-01-06" });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/monday to saturday/i);
    expect(Booking.create).not.toHaveBeenCalled();
  });

  it("rejects duplicate service date time slots", async () => {
    Booking.findOne.mockResolvedValue({ _id: "existing" });

    const response = await request(app).post("/api/bookings").send(validPayload);

    expect(response.status).toBe(409);
    expect(response.body.message).toMatch(/already booked/i);
    expect(Booking.create).not.toHaveBeenCalled();
  });

  it("rejects notes that are too long", async () => {
    const response = await request(app)
      .post("/api/bookings")
      .send({ ...validPayload, notes: "A".repeat(501) });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/notes/i);
    expect(Booking.create).not.toHaveBeenCalled();
  });

  it("returns available slots excluding booked times", async () => {
    const lean = jest.fn().mockResolvedValue([{ time: "10:00" }, { time: "14:00" }]);
    const select = jest.fn().mockReturnValue({ lean });
    Booking.find.mockReturnValue({ select });

    const response = await request(app)
      .get("/api/bookings/availability")
      .query({ service: "Knotless Braids", date: "2030-01-07" });

    expect(response.status).toBe(200);
    expect(response.body.slots).not.toContain("10:00");
    expect(response.body.slots).not.toContain("14:00");
    expect(response.body.slots).toContain("09:00");
  });

  it("returns a clear message when no slots are available", async () => {
    const lean = jest.fn().mockResolvedValue([
      { time: "09:00" },
      { time: "10:00" },
      { time: "11:30" },
      { time: "13:00" },
      { time: "14:00" },
      { time: "15:30" },
      { time: "17:00" },
    ]);
    const select = jest.fn().mockReturnValue({ lean });
    Booking.find.mockReturnValue({ select });

    const response = await request(app)
      .get("/api/bookings/availability")
      .query({ service: "Knotless Braids", date: "2030-01-07" });

    expect(response.status).toBe(200);
    expect(response.body.slots).toEqual([]);
    expect(response.body.message).toMatch(/no appointments/i);
  });
});
