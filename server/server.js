require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/db");
const { getEnv } = require("./config/env");

const { port, mongodbUri } = getEnv();

connectDatabase(mongodbUri)
  .then(() => {
    app.listen(port, () => {
      console.log("server started on port: ", port);
    });
  })
  .catch((error) => {
    console.error("failed to start server", error);
    process.exit(1);
  });
