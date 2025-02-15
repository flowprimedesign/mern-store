//import express from 'express';
import express from "express";

//import dotenv from 'dotenv';
import dotenv from "dotenv";
//this lets the file read env and use the mongodb uri
dotenv.config();

//to make both apps listen to the same port
import path from "path";

//import connectDB from './config/db.js';
import { connectDB } from "./config/db.js";

//import product
import Product from "./models/product.model.js";

//import mongoose
import mongoose from "mongoose";

const app = express();

//grabs the port to listen to from env
const PORT = process.env.PORT || 5000;

//path
const __dirname = path.resolve();

//middleware
app.use(express.json()); //allows to accept json data in the req.body

// test the localhost5000
// app.get("/", (req, res) => {
//   res.send("server is readyfsdfasf");
// });

//all of these api requests were moved to routes (to make this page cleaner)
//then from routes the function got moved to controllers
// //GET ALL PRODUCTS
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     console.log("error in fetching products: ", error.message);
//     res.status(500).json({ success: false, message: "server error" });
//   }
// });

// //post request to create a product in the database. can see it through postman
// app.post("/api/products", (req, res) => {
//   const product = req.body; //get the product from the request

//   if (!product.name || !product.price || !product.image) {
//     return res
//       .status(400)
//       .json({ success: false, message: "please provide all fields" });
//   }
//   const newProduct = new Product(product);

//   try {
//     newProduct.save();
//     res.status(201).json({ success: true, data: newProduct });
//   } catch (error) {
//     console.error("error in create product: ", error.message);
//     res.status(500).json({ success: false, message: "server error" });
//   }
// });

// //UPDATE A PRODUCT
// app.put("/api/products/:id", async (req, res) => {
//   const { id } = req.params;
//   const product = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res
//       .status(404)
//       .json({ success: false, message: "invalid product id" });
//   }

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(id, product, {
//       new: true,
//     });
//     res.status(200).json({ success: true, data: updatedProduct });
//   } catch (error) {
//     console.log("failure to update", error.message);
//   }
// });

// //api request to delete product
// app.delete("/api/products/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log("id: ", id);

//   //grabs that id the deletes it
//   try {
//     await Product.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "product deleted" });
//   } catch (error) {
//     console.log("error in deleting product:", error.message);
//     res.status(404).json({ success: false, message: "product not found" });
//   }
// });

//connect to the mongoDB through the .env file which has the mongoURI
//console.log(process.env.MONGO_URI);

//all the api request from above were moved to new folder routes, through express

// import the productroute.js + app.use()
import productRoutes from "./routes/product.route.js";
//this adds the prefix /api/products to all the requests from productRoutes. so in product routes
//there's no need for the prefix
app.use("/api/products", productRoutes);

//check for the environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//sets to open server in local host 5000
app.listen(PORT, () => {
  connectDB();
  console.log("server starter at localhost:" + PORT);
});
