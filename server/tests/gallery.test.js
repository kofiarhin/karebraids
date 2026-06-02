const request = require("supertest");
const app = require("../app");

describe("service-driven gallery API", () => {
  it("returns service previews with the first image as preview metadata", async () => {
    const response = await request(app).get("/api/gallery/services");

    expect(response.status).toBe(200);
    expect(response.body.services).toHaveLength(8);
    expect(response.body.services[0]).toEqual(
      expect.objectContaining({
        id: "knotless-braids",
        title: "Knotless Braids",
        currency: "GBP",
        previewImage: expect.objectContaining({
          id: expect.any(String),
          image: expect.stringMatching(/^https:\/\/images\.pexels\.com\//),
          aspect: expect.any(String),
        }),
      }),
    );
    expect(response.body.services[0].images).toBeUndefined();
  });

  it("returns all service images by default", async () => {
    const response = await request(app).get("/api/gallery");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(80);
    expect(response.body.selectedService).toBeNull();
    expect(response.body.reviews).toEqual([]);
    expect(response.body.galleryItems[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        serviceId: "knotless-braids",
        serviceTitle: "Knotless Braids",
        image: expect.stringMatching(/^https:\/\/images\.pexels\.com\//),
      }),
    );
  });

  it("returns selected service images, metadata, and reviews for a service query", async () => {
    const response = await request(app).get("/api/gallery?service=boho-knotless-braids");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(10);
    expect(response.body.galleryItems.every((item) => item.serviceId === "boho-knotless-braids")).toBe(true);
    expect(response.body.selectedService).toEqual(
      expect.objectContaining({
        id: "boho-knotless-braids",
        title: "Boho Knotless Braids",
        previewImage: expect.objectContaining({ id: response.body.galleryItems[0].id }),
      }),
    );
    expect(response.body.selectedService.images).toBeUndefined();
    expect(response.body.reviews).toHaveLength(3);
  });

  it("falls back to all images for an unknown service query", async () => {
    const response = await request(app).get("/api/gallery?service=unknown-style");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(80);
    expect(response.body.selectedService).toBeNull();
    expect(response.body.reviews).toEqual([]);
  });
});
