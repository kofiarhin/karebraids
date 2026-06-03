const { loadServicesFromJson, seedServices } = require("../scripts/seedServices");

const serviceFixture = [
  {
    id: "knotless-braids",
    title: "Knotless Braids",
    description: "Lightweight knotless braids.",
    startingPrice: 80,
    currency: "GBP",
    duration: { minHours: 4, maxHours: 6 },
    featured: true,
    images: [],
    reviews: [],
  },
  {
    id: "boho-knotless-braids",
    title: "Boho Knotless Braids",
    description: "Boho knotless braids.",
    startingPrice: 95,
    currency: "GBP",
    duration: { minHours: 5, maxHours: 7 },
    featured: true,
    images: [],
    reviews: [],
  },
];

describe("service seed script", () => {
  it("loads the existing JSON service data", () => {
    const services = loadServicesFromJson();

    expect(services).toHaveLength(8);
    expect(services[0]).toEqual(expect.objectContaining({ id: "knotless-braids" }));
  });

  it("inserts only missing services and skips duplicates", async () => {
    const ServiceModel = {
      findOne: jest.fn()
        .mockResolvedValueOnce({ id: "knotless-braids" })
        .mockResolvedValueOnce(null),
      create: jest.fn().mockResolvedValue(serviceFixture[1]),
    };

    const result = await seedServices({ services: serviceFixture, ServiceModel });

    expect(result).toEqual({ inserted: 1, skipped: 1, total: 2 });
    expect(ServiceModel.findOne).toHaveBeenCalledWith({ id: "knotless-braids" });
    expect(ServiceModel.findOne).toHaveBeenCalledWith({ id: "boho-knotless-braids" });
    expect(ServiceModel.create).toHaveBeenCalledTimes(1);
    expect(ServiceModel.create).toHaveBeenCalledWith(serviceFixture[1]);
  });

  it("treats duplicate key races as skipped records", async () => {
    const ServiceModel = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockRejectedValue({ code: 11000 }),
    };

    const result = await seedServices({ services: [serviceFixture[0]], ServiceModel });

    expect(result).toEqual({ inserted: 0, skipped: 1, total: 1 });
  });
});
