const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "Samsung 123",
  });
});

app.use(`/.netlify/functions/api`, router);

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
