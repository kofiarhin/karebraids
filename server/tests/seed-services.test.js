const Service = require("../models/Service");
const { loadServicesFromJson, seedServices } = require("../scripts/seedServices");

const serviceFixture = [
  {
    id: "knotless-braids",
    slug: "knotless-braids",
    name: "Knotless Braids",
    title: "Knotless Braids",
    category: "Braids",
    shortDescription: "Lightweight knotless braids.",
    description: "Lightweight knotless braids.",
    startingPrice: 80,
    priceFrom: 80,
    currency: "GBP",
    duration: { minHours: 4, maxHours: 6 },
    durationLabel: "4–6 hours",
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: "available",
    primaryImage: {
      id: "knotless-primary",
      title: "Knotless Braids",
      description: "Knotless braids preview.",
      image: "https://example.com/knotless.jpg",
      src: "https://example.com/knotless.jpg",
      alt: "Knotless braids",
      aspect: "feature",
    },
    images: [],
    reviews: [],
  },
];

describe("service seed script", () => {
  it("loads schema-complete JSON service data including Kids Braids", async () => {
    const services = loadServicesFromJson();
    const kidsBraids = services.find((service) => service.id === "kids-braids");

    expect(services.length).toBeGreaterThanOrEqual(9);
    expect(kidsBraids).toEqual(expect.objectContaining({
      slug: "kids-braids",
      name: "Kids Braids",
      bookingEnabled: true,
      galleryEnabled: true,
      status: "available",
      primaryImage: expect.objectContaining({ image: expect.stringMatching(/^https?:\/\//) }),
    }));

    await expect(Promise.all(services.map((service) => new Service(service).validate()))).resolves.toBeDefined();
    expect(JSON.stringify(services)).not.toMatch(/data:image|base64,/i);

    const expectedPrices = {
      "knotless-braids": 80,
      "boho-knotless-braids": 95,
      "fulani-braids": 85,
      "stitch-braids": 45,
      cornrows: 35,
      "tribal-braids": 90,
      "feed-in-braids": 55,
      "goddess-braids": 100,
      "kids-braids": 30,
      "box-braids": 70,
      twists: 65,
    };

    expect(Object.fromEntries(services.map(({ id, startingPrice }) => [id, startingPrice]))).toEqual(expectedPrices);
    services.forEach((service) => expect(service).not.toHaveProperty("priceFrom"));
  });

  it("upserts every service by stable id so reruns update existing records", async () => {
    const ServiceModel = {
      bulkWrite: jest.fn().mockResolvedValue({ upsertedCount: 1, matchedCount: 0, modifiedCount: 0 }),
    };

    const result = await seedServices({ services: serviceFixture, ServiceModel });

    expect(ServiceModel.bulkWrite).toHaveBeenCalledWith([
      {
        updateOne: {
          filter: { id: "knotless-braids" },
          update: { $set: serviceFixture[0] },
          upsert: true,
          runValidators: true,
        },
      },
    ]);
    expect(result).toEqual({ inserted: 1, matched: 0, updated: 0, total: 1 });
  });
});
