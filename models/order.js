const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
  currency: { type: String, required: true },
  offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
  status: { type: String, default: "Processing" },
  coupon: { type: String },
  price: { type: Number },
  type: { type: String, required: true },
  razorpay_order_id: { type: String },
  razorpay_signature: { type: String },
  razorpay_payment_id: { type: String },
});

const Receipt = mongoose.model("Receipt", schema);

module.exports = {
  Receipt: Receipt,
  orderSchema: schema,
};
