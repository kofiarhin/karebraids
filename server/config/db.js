const mongoose = require("mongoose");

async function connectDatabase(mongodbUri) {
  if (!mongodbUri) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(mongodbUri);
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
