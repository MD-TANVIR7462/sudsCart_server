const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("assignment");
    const collection = db.collection("users");
    const productCollection = db.collection("products");

    // // User Registration
    // app.post('/api/v1/register', async (req, res) => {
    //     const { name, email, password } = req.body;

    //     // Check if email already exists
    //     const existingUser = await collection.findOne({ email });
    //     if (existingUser) {
    //         return res.status(400).json({
    //             success: false,
    //             message: 'User already exists'
    //         });
    //     }

    //     // Hash the password
    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     // Insert user into the database
    //     await collection.insertOne({ name, email, password: hashedPassword });

    //     res.status(201).json({
    //         success: true,
    //         message: 'User registered successfully'
    //     });
    // });

    // // User Login
    // app.post('/api/v1/login', async (req, res) => {
    //     const { email, password } = req.body;

    //     // Find user by email
    //     const user = await collection.findOne({ email });
    //     if (!user) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //     }

    //     // Compare hashed password
    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //     }

    //     // Generate JWT token
    //     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

    //     res.json({
    //         success: true,
    //         message: 'Login successful',
    //         token
    //     });
    // });

    // ==============================================================
    // code starts form here
    // ==============================================================

    app.post("/api/v1/createAll-products", async (req, res) => {
      const data = req.body;
      const result = await productCollection.insertMany(data);
      res.send(result);
    });

    app.get("/api/v1/products", async (req, res) => {
      const query = req.query;
    
      const category = query.category;
      const price = query.price;
      const rating = query.rating;
    
 
      const filter = {};
      if (category) filter.category = category;
      // if (price) filter.price = parseFloat(price); 
      // if (rating) filter.ratings = parseFloat(rating);
    console.log(filter);
      try {
        // Using the constructed filter object to query the database
        const result = await productCollection.find(filter).toArray();
        res.status(200).send(result);
        console.log(result);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });
    


    app.get('/api/v1/products/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const result = await productCollection.findOne({ _id: new ObjectId(id) });
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ message: 'Product not exist' });
        }
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });
    

    app.get("/api/v1/flashproduct", async (req, res) => {
      try {
        const result = await productCollection
          .find({ flashSale: true })
          .toArray();
        res.status(200).send(result);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });
    app.get("/api/v1/topRatedProducts", async (req, res) => {
      try {
        const result = await productCollection
          .find({})
          .sort({ ratings: -1 })
          .limit(8)
          .toArray();
        res.status(200).send(result);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
