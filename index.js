const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Testing server endpoint
app.get("/", (req, res) => {
  res.send("Niche product website server is running");
});

// Listening the port
app.listen(port, () => {
  console.log("Listening to the port:", port);
});
