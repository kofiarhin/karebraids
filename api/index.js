const app = require("../server/app");
const { connectDatabase } = require("../server/config/db");
const { getEnv } = require("../server/config/env");

let databaseConnectionPromise;

function ensureDatabaseConnection() {
  if (!databaseConnectionPromise) {
    const { mongodbUri } = getEnv();
    databaseConnectionPromise = connectDatabase(mongodbUri).catch((error) => {
      databaseConnectionPromise = undefined;
      throw error;
    });
  }

  return databaseConnectionPromise;
}

async function handler(req, res) {
  await ensureDatabaseConnection();
  return app(req, res);
}

handler.ensureDatabaseConnection = ensureDatabaseConnection;
handler.resetDatabaseConnectionForTests = () => {
  databaseConnectionPromise = undefined;
};

module.exports = handler;
