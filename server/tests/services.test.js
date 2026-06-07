const request = require("supertest");
const Service = require("../models/Service");
const app = require("../app");

jest.mock("../models/Service", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
}));

const service = {
  id: "knotless-braids",
  slug: "knotless-braids",
  name: "Knotless Braids",
  title: "Knotless Braids",
  category: "Knotless",
  shortDescription: "A lightweight protective style.",
  description: "Lightweight knotless braids.",
  startingPrice: 80,
  currency: "GBP",
  duration: { minHours: 4, maxHours: 6 },
  durationLabel: "4–6 hours",
  featured: true,
  bookingEnabled: true,
  galleryEnabled: true,
  status: "available",
  primaryImage: {
    id: "knotless-primary",
    title: "Knotless braids",
    description: "Finished knotless braids.",
    image: "https://example.com/knotless.jpg",
    alt: "Knotless braids",
    aspect: "feature",
  },
  images: [
    {
      id: "knotless-gallery-1",
      title: "Knotless detail",
      description: "Detailed knotless braids.",
      image: "https://example.com/knotless-detail.jpg",
      alt: "Knotless braid detail",
      aspect: "portrait",
    },
  ],
  reviews: [],
};

function mockFind(services = [service]) {
  const lean = jest.fn().mockResolvedValue(services);
  const sort = jest.fn().mockReturnValue({ lean });
  Service.find.mockReturnValue({ sort });
  return { lean, sort };
}

function mockFindOne(result = service) {
  const lean = jest.fn().mockResolvedValue(result);
  Service.findOne.mockReturnValue({ lean });
  return { lean };
}

describe("public services API", () => {
  beforeEach(() => jest.resetAllMocks());

  it("GET /api/services returns frontend-friendly service aliases", async () => {
    mockFind();

    const response = await request(app).get("/api/services");

    expect(response.status).toBe(200);
    expect(Service.find).toHaveBeenCalledWith({});
    expect(response.body.services[0]).toEqual(expect.objectContaining({
      id: "knotless-braids",
      slug: "knotless-braids",
      name: "Knotless Braids",
      title: "Knotless Braids",
      startingPrice: 80,
      priceFrom: 80,
      fromPrice: 80,
      image: "https://example.com/knotless.jpg",
      primaryImage: expect.objectContaining({
        image: "https://example.com/knotless.jpg",
        src: "https://example.com/knotless.jpg",
      }),
      previewImage: expect.any(Object),
      images: expect.any(Array),
      galleryImages: expect.any(Array),
    }));
  });

  it.each([
    ["featured=true", { featured: true }],
    ["bookingEnabled=true", { bookingEnabled: true }],
    ["galleryEnabled=true", { galleryEnabled: true }],
    ["status=available", { status: "available" }],
  ])("GET /api/services?%s applies the requested filter", async (query, expected) => {
    mockFind();

    const response = await request(app).get(`/api/services?${query}`);

    expect(response.status).toBe(200);
    expect(Service.find).toHaveBeenCalledWith(expected);
  });

  it("GET /api/services/:id looks up a service by id or slug", async () => {
    mockFindOne();

    const response = await request(app).get("/api/services/knotless-braids");

    expect(response.status).toBe(200);
    expect(Service.findOne).toHaveBeenCalledWith({
      $or: [{ id: "knotless-braids" }, { slug: "knotless-braids" }],
    });
    expect(response.body.service.slug).toBe("knotless-braids");
  });

  it("GET /api/services/:id returns 404 for an unknown service", async () => {
    mockFindOne(null);

    const response = await request(app).get("/api/services/missing-service");

    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/service not found/i);
  });

  it("GET /api/services/:id/gallery returns normalized service gallery items", async () => {
    mockFindOne();

    const response = await request(app).get("/api/services/knotless-braids/gallery");

    expect(response.status).toBe(200);
    expect(response.body.service.id).toBe("knotless-braids");
    expect(response.body.galleryItems).toEqual([
      expect.objectContaining({
        id: "knotless-gallery-1",
        image: "https://example.com/knotless-detail.jpg",
        src: "https://example.com/knotless-detail.jpg",
        serviceId: "knotless-braids",
        serviceName: "Knotless Braids",
        serviceSlug: "knotless-braids",
        serviceTitle: "Knotless Braids",
        category: "Knotless",
      }),
    ]);
  });
});
