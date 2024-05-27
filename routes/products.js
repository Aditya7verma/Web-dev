const express = require("express");
const Product = require("../models/product");
const Review = require("../models/review");
const {
  validateProduct,
  isLoggedIn,
  isSeller,
  isProductAuthor,
} = require("../middleware");
const router = express.Router();

router.get("/products", async (req, res) => {
  // Applying try catch to  handle the err whenever the Server Crashes
  try {
    const products = await Product.find({});

    res.render("products/index", { products });
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

// Adding new Item
router.get("/products/new", isLoggedIn, isSeller, (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

// Creating
router.post(
  "/products",
  isLoggedIn,
  isSeller,
  validateProduct,
  async (req, res) => {
    try {
      // console.log(req.body);
      const { img, name, desc, price } = req.body;
      // adding author id so that it will recoganize its product
      await Product.create({ img, name, desc, price, author: req.user._id });
      
      // we can do above line of code in this way also using spread oprator
      // await product.create({...req.body , author: req.user._id })

      //  Adding flash message
      req.flash("success", "Added your Porduct successfully!");

      res.redirect("/products");
      // res.send("Successfully Posted Data!");
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

// Showing the product
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("reviews");
    // console.log(product);
    res.render("products/show", { product });
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

// Editing the product
router.get(
  "/products/:id/edit",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  async (req, res) => {
    try {
      // res.send('Edit Page');
      const { id } = req.params;
      const product = await Product.findById(id);
      res.render("products/edit", { product });
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

// Updtating the product and Redirecting it
// here we are applying isLoggedIn bcz throgh POSTMAN S/W someone can breach the data even if we hide the edit button on frontend.
router.patch(
  "/products/:id",
  isLoggedIn,
  isSeller,
  validateProduct,
  isProductAuthor,
  async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id);
      await Product.findByIdAndUpdate(id, req.body);

      //  Adding flash message
      req.flash("success", "Updated your Porduct Details successfully!");

      res.redirect(`/products/${id}`);
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

// Deleting the Product
router.delete(
  "/products/:id",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(id);

      const product = await Product.findById(id);

      // for (reviewId of product.reviews) {
      //   await Review.findByIdAndDelete(reviewId);
      // }

      const del = await Product.findByIdAndDelete(id);
      // console.log(del);

      //  Adding flash message
      req.flash("success", "Deleted your Porduct successfully!");

      res.redirect("/products");
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

module.exports = router;
