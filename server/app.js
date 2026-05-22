const express = require("express");
const app = express();

//setup middleware
app.use(express.json());

app.get("/", async (req, res, next) => {
  return res.json({ message: "welcome to karebraids" });
});

module.exports = app;
