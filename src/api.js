const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });

router.get("/", (req, res) => {
  res.json({
    hello: "Samsung 123",
  });
});

app.use(`/.netlify/functions/api`, router);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const routes = require("../routes");
app.use(`/.netlify/functions/api`, routes);

module.exports = app;
module.exports.handler = serverless(app);

const start = async () => {
  try {
    app.listen(3000, () => console.log("Server is listening"));
  } catch (error) {
    console.log(error);
  }
};

start();
