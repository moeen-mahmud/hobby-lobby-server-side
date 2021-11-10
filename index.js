const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongo Client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hobbylobbycluster.j98az.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongo Connection
async function run() {
  try {
    await client.connect();

    // Database collection
    const database = client.db("hobbyLobbyDatabase");
    const productCollection = database.collection("products");
    const reviewCollection = database.collection("reviews");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/reviews", async (req, res) => {
      const cursor = reviewCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);
// Testing server endpoint
app.get("/", (req, res) => {
  res.send("Niche product website server is running");
});

// Listening the port
app.listen(port, () => {
  console.log("Listening to the port:", port);
});
