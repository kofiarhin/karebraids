const request = require("supertest");
const app = require("../app");

describe("gallery API", () => {
  it("returns the complete backend-owned gallery by default", async () => {
    const response = await request(app).get("/api/gallery");

    expect(response.status).toBe(200);
    expect(response.body.galleryItems).toHaveLength(20);
    expect(response.body.galleryItems[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        image: expect.stringMatching(/^https:\/\//),
        style: expect.any(String),
      }),
    );
  });

  it("returns the first four items for a valid positive integer limit", async () => {
    const allItems = await request(app).get("/api/gallery");
    const limited = await request(app).get("/api/gallery?limit=4");

    expect(limited.status).toBe(200);
    expect(limited.body.galleryItems).toEqual(allItems.body.galleryItems.slice(0, 4));
  });

  it.each(["abc", "0", "-1", "1.5", "", " 4 "])(
    "returns the complete gallery for invalid limit %p",
    async (limit) => {
      const response = await request(app).get(`/api/gallery?limit=${encodeURIComponent(limit)}`);

      expect(response.status).toBe(200);
      expect(response.body.galleryItems).toHaveLength(20);
    },
  );
});
