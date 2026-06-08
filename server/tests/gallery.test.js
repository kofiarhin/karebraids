const request = require("supertest");
const Service = require("../models/Service");
const app = require("../app");

jest.mock("../models/Service", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
}));

const testServices = [
  {
    id: "knotless-braids",
    title: "Knotless Braids",
    description: "Lightweight knotless braids.",
    startingPrice: 80,
    currency: "GBP",
    duration: { minHours: 4, maxHours: 6 },
    featured: true,
    images: [
      {
        id: "knotless-braids-01",
        title: "Knotless Braids Preview",
        description: "Preview image.",
        image: "https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg",
        aspect: "feature",
      },
      {
        id: "knotless-braids-02",
        title: "Knotless Braids Detail",
        description: "Detail image.",
        image: "https://images.pexels.com/photos/9385074/pexels-photo-9385074.jpeg",
        aspect: "medium",
      },
    ],
    reviews: [
      { id: "review-1", name: "Ama", rating: 5, comment: "Beautiful work." },
    ],
  },
  {
    id: "boho-knotless-braids",
    title: "Boho Knotless Braids",
    description: "Boho knotless braids.",
    startingPrice: 95,
    currency: "GBP",
    duration: { minHours: 5, maxHours: 7 },
    featured: true,
    images: [
      {
        id: "boho-knotless-braids-01",
        title: "Boho Preview",
        description: "Boho preview image.",
        image: "https://images.pexels.com/photos/6976266/pexels-photo-6976266.jpeg",
        aspect: "feature",
      },
    ],
    reviews: [
      { id: "review-2", name: "Nia", rating: 5, comment: "Soft and neat." },
      { id: "review-3", name: "Zara", rating: 4, comment: "Loved it." },
    ],
  },
];

function mockFindServices(services = testServices) {
  const lean = jest.fn().mockResolvedValue(services);
  const sort = jest.fn().mockReturnValue({ lean });
  Service.find.mockReturnValue({ sort });
  return { lean, sort };
}

function mockFindService(service) {
  const lean = jest.fn().mockResolvedValue(service);
  Service.findOne.mockReturnValue({ lean });
  return { lean };
}

describe("service-driven gallery API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns service previews with the first image as preview metadata from MongoDB", async () => {
    const { sort } = mockFindServices();

    const response = await request(app).get("/api/gallery/services");

    expect(response.status).toBe(200);
    expect(Service.find).toHaveBeenCalledWith({});
    expect(sort).toHaveBeenCalledWith({ createdAt: 1, _id: 1 });
    expect(response.body.services).toHaveLength(2);
    expect(response.body.services[0]).toEqual(
      expect.objectContaining({
        id: "knotless-braids",
        title: "Knotless Braids",
        currency: "GBP",
        previewImage: expect.objectContaining({
          id: "knotless-braids-01",
          image: expect.stringMatching(/^https:\/\/images\.pexels\.com\//),
          aspect: "feature",
        }),
      }),
    );
    expect(response.body.services[0].images).toHaveLength(2);
    expect(response.body.services[0].galleryImages).toHaveLength(2);
    expect(response.body.services[0].priceFrom).toBe(80);
  });

  it("returns all service images by default", async () => {
    mockFindServices();

    const response = await request(app).get("/api/gallery");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(3);
    expect(response.body.selectedService).toBeNull();
    expect(response.body.reviews).toEqual([]);
    expect(response.body.galleryItems[0]).toEqual(
      expect.objectContaining({
        id: "knotless-braids-01",
        serviceId: "knotless-braids",
        serviceTitle: "Knotless Braids",
        image: expect.stringMatching(/^https:\/\/images\.pexels\.com\//),
      }),
    );
  });

  it("limits all gallery items when limit is a positive integer string", async () => {
    mockFindServices();

    const response = await request(app).get("/api/gallery?limit=2");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(2);
  });

  it("returns selected service images, metadata, and reviews for a service query", async () => {
    mockFindService(testServices[1]);

    const response = await request(app).get("/api/gallery?service=boho-knotless-braids");

    expect(response.status).toBe(200);
    expect(Service.findOne).toHaveBeenCalledWith({
      $or: [{ id: "boho-knotless-braids" }, { slug: "boho-knotless-braids" }],
    });
    expect(response.body.galleryItems).toHaveLength(1);
    expect(response.body.galleryItems.every((item) => item.serviceId === "boho-knotless-braids")).toBe(true);
    expect(response.body.selectedService).toEqual(
      expect.objectContaining({
        id: "boho-knotless-braids",
        title: "Boho Knotless Braids",
        previewImage: expect.objectContaining({ id: response.body.galleryItems[0].id }),
      }),
    );
    expect(response.body.selectedService.images).toHaveLength(1);
    expect(response.body.selectedService.galleryImages).toHaveLength(1);
    expect(response.body.reviews).toHaveLength(2);
  });

  it("falls back to all images for an unknown service query", async () => {
    mockFindService(null);
    mockFindServices();

    const response = await request(app).get("/api/gallery?service=unknown-style");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(3);
    expect(response.body.selectedService).toBeNull();
    expect(response.body.reviews).toEqual([]);
  });
});
