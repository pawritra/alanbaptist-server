const mongoose = require("mongoose");
const { Schema } = mongoose;

const Service = require("./service").Service;

const schema = Schema({
  currency: { type: String, required: true },
  price: { type: Number, required: true },
  discounted_price: { type: Number },
  duration: { type: String, required: true },
  features: [String],
  recommended: { type: Boolean, required: true },
  in_stock: { type: Boolean, required: true },
  feature_images: [String],
  offer_name: { type: String, required: true },
});

schema.pre("remove", { document: false, query: false }, () => {
  Service.updateOne({ offers: this._id }, { $pullAll: { offers: [this._id] } });
});

const Offer = mongoose.model("Offer", schema);

module.exports = {
  Offer: Offer,
  offerSchema: schema,
};
