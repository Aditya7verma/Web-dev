const express = require("express");
const { isLoggedIn } = require("../middleware");
const User = require("../models/user");
const router = express.Router();

// Route for Add to cart and Incrementing item in the cart
router.post("/user/:productId/add", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  // Taking data from database of user with the help of userId
  const user = await User.findById(userId);

  // Now we will check in this user cart the item exist or not
  const cartItem = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });

  if (cartItem) {
    cartItem.quantity++;
  } else {
    user.cart.push({ productId });
  }

  await user.save();

  req.flash("success", "Item added to your cart successfully");
  res.redirect("back");
});

// Route for removing item in the cart
router.post("/user/:productId/remove", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  const cartItem = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });

  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
  }

  await user.save();

  res.redirect("back");
});

// Deleting the Product from the Cart
router.delete("/user/:productId", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  const itemIndex = user.cart.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (itemIndex !== -1) {
    user.cart.splice(itemIndex, 1);
  }

  await user.save();
  req.flash("success", "Item Removed from your cart successfully");

  res.redirect("back");
});

// Getting items in cart of current user
router.get("/user/cart", isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("cart.productId");

  // Geting Total Amount
  let totalAmount = 0;
  user.cart.forEach((item) => {
    totalAmount += item.quantity * item.productId.price;
  });

  res.render("cart/index", { user, totalAmount });
});

module.exports = router;
