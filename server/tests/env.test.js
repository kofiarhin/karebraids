const { getEnv } = require("../config/env");

describe("environment validation", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it("fails fast outside tests when MONGODB_URI is missing", () => {
    process.env = { NODE_ENV: "production" };

    expect(() => getEnv()).toThrow("MONGODB_URI is required");
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
    };

    expect(getEnv().mongodbUri).toBe("mongodb://127.0.0.1:27017/karebraids");
  });
});
