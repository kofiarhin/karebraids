function getEnv() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const port = Number(process.env.PORT || 5000);
  const mongodbUri = process.env.MONGODB_URI?.trim();
  const adminUsername = process.env.ADMIN_USERNAME?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  const jwtSecret = process.env.JWT_SECRET?.trim();

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a valid number");
  }

  if (nodeEnv !== "test" && !mongodbUri) {
    throw new Error("MONGODB_URI is required");
  }

  if (nodeEnv !== "test") {
    if (!adminUsername) {
      throw new Error("ADMIN_USERNAME is required");
    }

    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD is required");
    }

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is required");
    }
  }

  return {
    adminPassword,
    adminUsername,
    jwtSecret,
    nodeEnv,
    port,
    mongodbUri,
  };
}

module.exports = {
  getEnv,
};
