const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  data_interval: { type: Number, required: true },
});

const Util = mongoose.model("Util", schema);

module.exports = {
  Util: Util,
  utilSchema: schema,
};
