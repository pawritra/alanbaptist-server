const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  image: { type: String, required: true },
  email: { type: String, required: false },
  name: { type: String, required: true },
  phone: { type: String, required: false },
  role: { type: String, required: true, enum: ['coach', 'doctor', 'intern'], },
  description: { type: String, required: false }
}, { timestamps: true });

schema.index({name: 'text'});


const Employee = mongoose.model("Employee", schema);

module.exports = {
  Employee: Employee,
  messageSchema: schema,
};
