const express = require("express");
const axios = require("axios");

const app = express();

app.get(["/api/stock-pricing"], async function (req, res) {
  try {
    const response = await axios.get("https://join.reckon.com/stock-pricing");
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.listen(4000, function () {
  console.log("Proxy server listening on port 4000!");
});
