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
    const userCollection = database.collection("users");

    // GET all products
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // GET product by id
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      console.log("Finding the product", result);
      res.json(result);
    });

    // GET all reviews
    app.get("/reviews", async (req, res) => {
      const cursor = reviewCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // POST user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result);
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
