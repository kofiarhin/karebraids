const request = require("supertest");
const jwt = require("jsonwebtoken");
const Service = require("../models/Service");
const app = require("../app");

jest.mock("../models/Service", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndDelete: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

const adminEnv = {
  NODE_ENV: "test",
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "correct-password",
  JWT_SECRET: "test-secret",
};

const validServicePayload = {
  id: "goddess-braids",
  title: "Goddess Braids",
  description: "Soft goddess braids with curly detail.",
  startingPrice: 120,
  currency: "GBP",
  duration: { minHours: 5, maxHours: 7 },
  featured: true,
  images: [
    {
      id: "goddess-braids-01",
      title: "Goddess Braids Preview",
      description: "Preview image.",
      image: "https://example.com/goddess-braids.jpg",
      aspect: "feature",
    },
  ],
  reviews: [
    { id: "review-1", name: "Ama", rating: 5, comment: "Perfect." },
  ],
};

const validImagePayload = {
  id: "goddess-braids-02",
  title: "Goddess Braids Detail",
  description: "Detail image.",
  image: "https://example.com/goddess-braids-detail.jpg",
  aspect: "medium",
};

function adminToken() {
  return jwt.sign({ sub: "admin", role: "admin" }, "test-secret", {
    expiresIn: "8h",
  });
}

function authed(requestBuilder) {
  return requestBuilder.set("Authorization", `Bearer ${adminToken()}`);
}

function mockServiceDocument(service = validServicePayload) {
  const document = {
    ...service,
    images: [...(service.images || [])],
    reviews: [...(service.reviews || [])],
    save: jest.fn(),
    toObject: jest.fn(),
  };
  document.save.mockResolvedValue(document);
  document.toObject.mockImplementation(() => ({
    id: document.id,
    title: document.title,
    description: document.description,
    startingPrice: document.startingPrice,
    currency: document.currency,
    duration: document.duration,
    featured: document.featured,
    images: document.images,
    reviews: document.reviews,
  }));
  return document;
}

function mockFindServices(services = [validServicePayload]) {
  const lean = jest.fn().mockResolvedValue(services);
  const sort = jest.fn().mockReturnValue({ lean });
  Service.find.mockReturnValue({ sort });
}

function mockFindService(service) {
  const lean = jest.fn().mockResolvedValue(service);
  Service.findOne.mockReturnValue({ lean });
}

describe("admin service API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ...adminEnv };
    jest.resetAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("rejects service list requests without admin auth", async () => {
    const response = await request(app).get("/api/admin/services");

    expect(response.status).toBe(401);
    expect(Service.find).not.toHaveBeenCalled();
  });

  it("lists services for authenticated admins", async () => {
    mockFindServices();

    const response = await authed(request(app).get("/api/admin/services"));

    expect(response.status).toBe(200);
    expect(response.body.services).toHaveLength(1);
    expect(Service.find).toHaveBeenCalledWith({});
  });

  it("gets one service by slug", async () => {
    mockFindService(validServicePayload);

    const response = await authed(request(app).get("/api/admin/services/goddess-braids"));

    expect(response.status).toBe(200);
    expect(response.body.service.id).toBe("goddess-braids");
    expect(Service.findOne).toHaveBeenCalledWith({ id: "goddess-braids" });
  });

  it("creates a service with the confirmed response contract", async () => {
    Service.create.mockResolvedValue(validServicePayload);

    const response = await authed(request(app).post("/api/admin/services")).send(validServicePayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Service created.", service: validServicePayload });
    expect(Service.create).toHaveBeenCalledWith(expect.objectContaining({ id: "goddess-braids" }));
  });

  it("updates a service by slug", async () => {
    Service.findOneAndUpdate.mockResolvedValue({ ...validServicePayload, title: "Updated Goddess Braids" });

    const response = await authed(request(app).put("/api/admin/services/goddess-braids")).send({
      ...validServicePayload,
      title: "Updated Goddess Braids",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Service updated.");
    expect(response.body.service.title).toBe("Updated Goddess Braids");
    expect(Service.findOneAndUpdate).toHaveBeenCalledWith(
      { id: "goddess-braids" },
      expect.objectContaining({ id: "goddess-braids", title: "Updated Goddess Braids" }),
      { new: true, runValidators: true },
    );
  });

  it("deletes a service by slug", async () => {
    Service.findOneAndDelete.mockResolvedValue(validServicePayload);

    const response = await authed(request(app).delete("/api/admin/services/goddess-braids"));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Service deleted." });
  });

  it("returns meaningful validation errors", async () => {
    const response = await authed(request(app).post("/api/admin/services")).send({
      ...validServicePayload,
      id: "Bad Slug",
      images: [{ ...validImagePayload, image: "not-a-url" }],
      reviews: [{ id: "review-1", name: "Ama", rating: 6, comment: "Too high." }],
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(response.body.errors[0]);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        "Service id must be a lowercase slug.",
        "Image URL must be a valid http or https URL.",
        "Review rating must be between 1 and 5.",
      ]),
    );
    expect(Service.create).not.toHaveBeenCalled();
  });

  it("returns conflict for duplicate service slugs", async () => {
    Service.create.mockRejectedValue({ code: 11000 });

    const response = await authed(request(app).post("/api/admin/services")).send(validServicePayload);

    expect(response.status).toBe(409);
    expect(response.body.message).toMatch(/already exists/i);
  });

  it("adds an embedded service image", async () => {
    const service = mockServiceDocument();
    Service.findOne.mockResolvedValue(service);

    const response = await authed(request(app).post("/api/admin/services/goddess-braids/images")).send(validImagePayload);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Service image added.");
    expect(response.body.image).toEqual(validImagePayload);
    expect(response.body.service.images).toHaveLength(2);
    expect(service.save).toHaveBeenCalled();
  });

  it("updates an embedded service image", async () => {
    const service = mockServiceDocument();
    Service.findOne.mockResolvedValue(service);

    const response = await authed(request(app).put("/api/admin/services/goddess-braids/images/goddess-braids-01")).send({
      ...validImagePayload,
      id: "goddess-braids-01",
      title: "Updated Image",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Service image updated.");
    expect(response.body.image.title).toBe("Updated Image");
    expect(response.body.service.images[0].title).toBe("Updated Image");
    expect(service.save).toHaveBeenCalled();
  });

  it("deletes an embedded service image", async () => {
    const service = mockServiceDocument();
    Service.findOne.mockResolvedValue(service);

    const response = await authed(request(app).delete("/api/admin/services/goddess-braids/images/goddess-braids-01"));

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Service image deleted.");
    expect(response.body.service.images).toHaveLength(0);
    expect(service.save).toHaveBeenCalled();
  });

  it("returns 404 when an embedded service image is missing", async () => {
    const service = mockServiceDocument();
    Service.findOne.mockResolvedValue(service);

    const response = await authed(request(app).delete("/api/admin/services/goddess-braids/images/missing-image"));

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/image not found/i);
  });
});
