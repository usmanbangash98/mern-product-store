import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProducts = async (req, res) => {
  const product = req.body;
  // Implement product creation logic here
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  console.log("fill all the fields");
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
    console.log("Product created successfully");
    console.log(newProduct);
  } catch (error) {
    console.error("error creating product", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      count: products.length,
      data: products,
      message: "all products are fetched",
    });
    console.log(products);
  } catch (error) {
    console.error("error fetching products", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
    console.log("Successfully deleted product with id " + id);
  } catch (error) {
    console.error("error deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
