//this express router makes it cleaner to read the code because you get rid of the prefixes
//then there's a second folder for controllers that house all the function for the api request

import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

//GET ALL PRODUCTS using express router, and route folder holds the get code
import { getProducts } from "../controllers/product.controller.js";
router.get("/", getProducts);

//post request to create a product in the database. can see it through postman
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
router.post("/", createProduct);

//UPDATE A PRODUCT
router.put("/:id", updateProduct);

//api request to delete product
router.delete("/:id", deleteProduct);

export default router;
