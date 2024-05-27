const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

// creating route to check if the user exist or not in req.body
// router.get("/check", (req, res) => {
//   console.log(req.user);
//   res.send("Done!");
// });

// router.get("/fakeUser", async (req, res) => {
//   const user = {
//     email: "av1234@gmail.com",
//     username: "Aditya",
//   };

//   const newUser = await User.register(user, "1234");
//   res.send(newUser);
// });

router.get("/login", (req, res) => {
  res.render("auth/login");
});

// signUp
router.get("/signup", (req, res) => {
  res.render("auth/signUp");
});

// to get the user details
router.post("/signup", async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    // creating new user
    const user = new User({ username, email, role });

    const newUser = await User.register(user, password);

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      req.flash(
        "success",
        `Welcome ${req.user.username}!, you are Registered Successfully!`
      );
      res.redirect("/products");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signUp");
  }
});

// post login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", `Welcome ${req.user.username}! `);
    res.redirect("/products");
  }
);

// logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Feel free to visit again, Thank you!");
    res.redirect("/products");
  });
});
module.exports = router;
