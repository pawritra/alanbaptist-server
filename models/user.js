const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", schema);

module.exports = {
  User: User,
  userSchema: schema,
};
