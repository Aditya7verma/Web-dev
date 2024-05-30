const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // Which user orderd for payment
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //How much amount user is paying
  amount: Number,

  // payment status
  paymentStatus: Boolean,
});

// Crating Model for order
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
