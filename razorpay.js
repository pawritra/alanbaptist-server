const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET,
});

module.exports = instance;
