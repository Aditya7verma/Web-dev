const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const RAZORPAY_KEY_ID = "rzp_test_oUOQDMOSBMn46i";
const RAZORPAY_KEY_SECRET = "yjAXZqjmQKycYYPCqDeXYjjq";

// An Order will create first when we click on Buy now

router.post("/order", async (req, res) => {
  // Creating Instance of RazorPay
 
  try {
    const instance = new Razorpay({
      key_id: "RAZORPAY_KEY_ID",
      key_secret: "RAZORPAY_KEY_SECRET",
    });

    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    console.log(order);

    res.json({
      success: true,
    });
  } catch (e) {
    res.json({ err: e });
  }
});

module.exports = router;
