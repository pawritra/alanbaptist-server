const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
  phone: { type: String, required: true }
}, { timestamps: true });

const Message = mongoose.model("message", schema);

module.exports = {
  Message: Message,
  messageSchema: schema,
};
