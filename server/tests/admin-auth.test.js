const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { getEnv } = require("../config/env");

describe("admin authentication", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NODE_ENV: "test",
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "correct-password",
      JWT_SECRET: "test-secret",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("logs in with configured admin credentials and returns a JWT", async () => {
    const response = await request(app)
      .post("/api/admin/login")
      .send({ username: "admin", password: "correct-password" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Admin login successful.",
        token: expect.any(String),
      }),
    );
    expect(response.body).not.toHaveProperty("password");

    const decoded = jwt.verify(response.body.token, "test-secret");
    expect(decoded).toEqual(expect.objectContaining({ role: "admin", sub: "admin" }));
  });

  it("rejects invalid admin credentials", async () => {
    const response = await request(app)
      .post("/api/admin/login")
      .send({ username: "admin", password: "wrong-password" });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/invalid admin credentials/i);
    expect(response.body).not.toHaveProperty("token");
  });

  it("requires admin auth for guarded admin routes", async () => {
    const missingToken = await request(app).get("/api/admin/session");

    expect(missingToken.status).toBe(401);
    expect(missingToken.body.message).toMatch(/admin authentication required/i);

    const invalidToken = await request(app)
      .get("/api/admin/session")
      .set("Authorization", "Bearer not-a-real-token");

    expect(invalidToken.status).toBe(401);
    expect(invalidToken.body.message).toMatch(/invalid admin token/i);

    const token = jwt.sign({ sub: "admin", role: "admin" }, "test-secret", {
      expiresIn: "8h",
    });

    const validToken = await request(app)
      .get("/api/admin/session")
      .set("Authorization", `Bearer ${token}`);

    expect(validToken.status).toBe(200);
    expect(validToken.body.admin).toEqual({ username: "admin", role: "admin" });
  });

  it("rejects malformed bearer authorization headers", async () => {
    const token = jwt.sign({ sub: "admin", role: "admin" }, "test-secret", {
      expiresIn: "8h",
    });

    const response = await request(app)
      .get("/api/admin/session")
      .set("Authorization", `Bearer ${token} extra`);

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/admin authentication required/i);
  });

  it("fails fast outside tests when required admin env vars are missing", () => {
    process.env = {
      NODE_ENV: "production",
      PORT: "5000",
      MONGODB_URI: "mongodb://127.0.0.1:27017/karebraids",
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "correct-password",
    };

    expect(() => getEnv()).toThrow("JWT_SECRET is required");
  });
});
