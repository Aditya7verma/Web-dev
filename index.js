const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
// requiring session
const session = require("express-session");
// requiring flash
const connectFlash = require("connect-flash");
// requiring Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// requiring user Schema for passport
const user = require("./models/user");
const port = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerece")
  .then(() => {
    console.log("DB-Connected");
  })
  .catch((e) => console.log(e));

const sessionConfig = {
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
};

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(connectFlash());

// Initializing Middlewar for Passport
app.use(passport.initialize());
app.use(passport.session());

// Telling  passport to check for username and password using authenticate
// method provided by the passport-local mongoose
passport.use(new LocalStrategy(user.authenticate()));

// session usage in passport to store user_id
passport.serializeUser(user.serializeUser());
// removing user_id from session after user logout
passport.deserializeUser(user.deserializeUser());

// Adding flash msg using locals

app.use((req, res, next) => {
  // console.log(req.session);
  // storing user in locals
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  // here we have to use error insted of reject
  res.locals.error = req.flash("error");
  next();
});

// ---------------Routes
const productRoutes = require("./routes/products");

const reviewRoutes = require("./routes/review");

const authRoutes = require("./routes/auth");

// ----------------- APIs
const productAPI = require("./routes/api/productApi");

app.use(productRoutes);

app.use(reviewRoutes);

app.use(authRoutes);

app.use(productAPI);

// rendering the home.ejs file
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server is up at PORT", port);
});
