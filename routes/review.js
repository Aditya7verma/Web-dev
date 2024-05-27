const express = require("express");
const Review = require("../models/review");
const Product = require("../models/product");
const router = express.Router();
const { validateReview, isLoggedIn } = require("../middleware");

router.post(
  "/products/:productId/review",
  isLoggedIn,
  validateReview,
  async (req, res) => {
    try {
      //   console.log(req.body);

      const { productId } = req.params;
      const newReview = new Review(req.body);
      await newReview.save();

      // the above 2 line can be done in single line
      //   await Review.create(req.body);

      const product = await Product.findById(productId);

      // Formula for avg Rating
      const newAvgRating =
        (product.avgRating * product.reviews.length +
          parseInt(req.body.rating)) /
        (product.reviews.length + 1);
      // Updating the avg rating and toFixed fun is rounding of to 1 digit
      product.avgRating = parseFloat(newAvgRating.toFixed(1));

      product.reviews.push(newReview);

      await product.save();
      await newReview.save();

      req.flash("success", "Added your Review successfully!");

      res.redirect("back");
    } catch (e) {
      req.redirect("error", { err: e.message });
    }
  }
);

module.exports = router;
