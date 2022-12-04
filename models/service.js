const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  service: { type: String, required: true, unique: true },
  service_image: [{ type: String }],
  description: { type: String },
  level: { type: Number },
  sequence: { type: Number },
  subservices: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  offers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Offer",
    },
  ],
});

const Service = mongoose.model("Service", schema);

module.exports = {
  Service: Service,
  serviceSchema: schema,
};
