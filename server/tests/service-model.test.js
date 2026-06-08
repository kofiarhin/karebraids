const Service = require("../models/Service");

const validService = {
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
      image: "https://example.com/knotless-braids.jpg",
      aspect: "feature",
    },
  ],
  reviews: [
    { id: "review-1", name: "Ama", rating: 5, comment: "Beautiful." },
  ],
};

describe("Service model", () => {
  it("validates the requested service structure", async () => {
    const service = new Service(validService);

    await expect(service.validate()).resolves.toBeUndefined();
  });

  it("requires a lowercase slug service id", async () => {
    const service = new Service({ ...validService, id: "Bad Slug" });

    await expect(service.validate()).rejects.toThrow(/Path `id` is invalid/i);
  });

  it("validates embedded image URLs", async () => {
    const service = new Service({
      ...validService,
      images: [{ ...validService.images[0], image: "not-a-url" }],
    });

    await expect(service.validate()).rejects.toThrow(/Image URL must be a valid http or https URL/i);
  });

  it("validates review rating range", async () => {
    const service = new Service({
      ...validService,
      reviews: [{ ...validService.reviews[0], rating: 6 }],
    });

    await expect(service.validate()).rejects.toThrow(/more than maximum allowed value/i);
  });

  it("rejects duplicate embedded image ids", async () => {
    const service = new Service({
      ...validService,
      images: [validService.images[0], { ...validService.images[0] }],
    });

    await expect(service.validate()).rejects.toThrow(/Image ids must be unique within a service/i);
  });
});

it("supports canonical service metadata and primary image aliases", async () => {
  const service = new Service({
    ...validService,
    slug: "knotless-braids",
    name: "Knotless Braids",
    category: "Braids",
    shortDescription: "Lightweight and natural-looking.",
    priceFrom: 80,
    durationLabel: "4–6 hours",
    bookingEnabled: true,
    galleryEnabled: true,
    status: "available",
    primaryImage: {
      ...validService.images[0],
      src: "https://example.com/knotless-braids.jpg",
      alt: "Knotless braids hairstyle",
    },
  });

  await expect(service.validate()).resolves.toBeUndefined();
  expect(service.primaryImage.src).toBe("https://example.com/knotless-braids.jpg");
});

it("validates optional primary image and gallery src URLs", async () => {
  const service = new Service({
    ...validService,
    primaryImage: { ...validService.images[0], src: "javascript:alert(1)" },
    images: [{ ...validService.images[0], src: "not-a-url" }],
  });

  await expect(service.validate()).rejects.toThrow(/Image src must be a valid http or https URL/i);
});
