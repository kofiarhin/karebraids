function getEnv() {
  const nodeEnv = process.env.NODE_ENV || "development";
  const port = Number(process.env.PORT || 5000);
  const mongodbUri = process.env.MONGODB_URI?.trim();

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a valid number");
  }

  if (nodeEnv !== "test" && !mongodbUri) {
    throw new Error("MONGODB_URI is required");
  }

  return {
    nodeEnv,
    port,
    mongodbUri,
  };
}

module.exports = {
  getEnv,
};
