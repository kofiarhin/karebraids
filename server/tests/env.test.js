const { getEnv, getMongoDbUri } = require("../config/env");

describe("environment validation", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it("fails fast outside tests when MONGODB_URI is missing", () => {
    process.env = { NODE_ENV: "production" };

    expect(() => getEnv()).toThrow("MONGODB_URI is required");
  });

  it("allows database-only commands to read MONGODB_URI without admin credentials", () => {
    process.env = {
      NODE_ENV: "production",
      MONGODB_URI: "  mongodb://127.0.0.1:27017/karebraids  ",
    };

    expect(getMongoDbUri()).toBe("mongodb://127.0.0.1:27017/karebraids");
  });

  it("allows tests to provide an in-memory or mocked database path", () => {
    process.env = { NODE_ENV: "test" };

    expect(getEnv()).toEqual(
      expect.objectContaining({
        nodeEnv: "test",
        port: 5000,
      }),
    );
  });

  it("rejects invalid port values", () => {
    process.env = {
      NODE_ENV: "test",
      PORT: "not-a-port",
    };

    expect(() => getEnv()).toThrow("PORT must be a valid number");
  });

  it("normalizes configured MongoDB URI whitespace", () => {
    process.env = {
      NODE_ENV: "production",
      MONGODB_URI: "  mongodb://127.0.0.1:27017/karebraids  ",
      ADMIN_USERNAME: "  admin  ",
      ADMIN_PASSWORD: "correct-password",
      JWT_SECRET: "test-secret",
    };

    expect(getEnv()).toEqual(
      expect.objectContaining({
        adminUsername: "admin",
        mongodbUri: "mongodb://127.0.0.1:27017/karebraids",
      }),
    );
  });
});
