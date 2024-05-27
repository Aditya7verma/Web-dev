// We can create the folder of middleware too
// where we can store all the middleware files

const Product = require("./models/product");
const { productSchema, reviewSchema } = require("./schemas");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.xhr);

  if (req.xhr && !req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      msg: "Please Login first",
    });
  }

  // To chek if the user exist or not
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }

  next();
};

module.exports.validateProduct = (req, res, next) => {
  const { name, img, price, desc } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });

  //   console.log(error.details[0].message);

  //   Here we are taking the all the error and seprating them via commas
  if (error) {
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });

  if (error) {
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

// Creating middleware for authorize Seller

module.exports.isSeller = (req, res, next) => {
  if (req.user.role === "buyer") {
    req.flash("error", "You are not authorised to do that!!");
    return res.redirect("back");
  }

  next();
};

// Checking the author(seller) particular product

module.exports.isProductAuthor = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  // checking if product author is = current user via equals function

  if (!product.author || !product.author.equals(req.user._id)) {
    req.flash("error", "You are not authorised to do that!!");
    return res.redirect("back");
  }

  next();
};
