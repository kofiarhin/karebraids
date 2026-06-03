const path = require("path");
const { connectDatabase, disconnectDatabase } = require("../config/db");
const { getEnv } = require("../config/env");
const Service = require("../models/Service");

function loadServicesFromJson() {
  return require(path.join("..", "data", "services.json"));
}

async function seedServices({ services = loadServicesFromJson(), ServiceModel = Service } = {}) {
  let inserted = 0;
  let skipped = 0;

  for (const service of services) {
    const existingService = await ServiceModel.findOne({ id: service.id });

    if (existingService) {
      skipped += 1;
      continue;
    }

    try {
      await ServiceModel.create(service);
      inserted += 1;
    } catch (error) {
      if (error.code === 11000) {
        skipped += 1;
        continue;
      }

      throw error;
    }
  }

  return { inserted, skipped, total: services.length };
}

async function runSeedServices() {
  const { mongodbUri } = getEnv();

  await connectDatabase(mongodbUri);

  try {
    const result = await seedServices();
    console.log(
      `Service seed complete. Inserted: ${result.inserted}. Skipped: ${result.skipped}. Total: ${result.total}.`,
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

module.exports = {
  loadServicesFromJson,
  runSeedServices,
  seedServices,
};
