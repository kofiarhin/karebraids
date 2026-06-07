require("dotenv").config({ quiet: true });

const path = require("path");
const { connectDatabase, disconnectDatabase } = require("../config/db");
const { getEnv } = require("../config/env");
const Service = require("../models/Service");

function loadServicesFromJson() {
  return require(path.join("..", "data", "services.json"));
}

async function seedServices({ services = loadServicesFromJson(), ServiceModel = Service } = {}) {
  if (services.length === 0) return { inserted: 0, matched: 0, updated: 0, total: 0 };

  const operations = services.map((service) => ({
    updateOne: {
      filter: { id: service.id },
      update: { $set: service },
      upsert: true,
      runValidators: true,
    },
  }));
  const result = await ServiceModel.bulkWrite(operations);

  return {
    inserted: result.upsertedCount || 0,
    matched: result.matchedCount || 0,
    updated: result.modifiedCount || 0,
    total: services.length,
  };
}

async function runSeedServices() {
  const { mongodbUri } = getEnv();
  await connectDatabase(mongodbUri);

  try {
    const result = await seedServices();
    console.log(
      `Service seed complete. Inserted: ${result.inserted}. Matched: ${result.matched}. Updated: ${result.updated}. Total: ${result.total}.`,
    );
    return result;
  } finally {
    await disconnectDatabase();
  }
}

if (require.main === module) {
  runSeedServices().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { loadServicesFromJson, runSeedServices, seedServices };
