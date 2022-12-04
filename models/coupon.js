const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  discount: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
});

const Coupon = mongoose.model("Coupon", schema);

module.exports = {
  Coupon: Coupon,
  counponSchema: schema,
};
