// Gender - Male || Female
// Age group - 20s || 30s || 40s || 50+
// Heigh - String (Example: 5 Feet 3 inches, 60 cm)
// Weight: String (Example: 57 Kg)
// Activity level - String (Will have the entire text as string)
// Goal - String (Will have the entire text as string)
// Name
// Phone number with country code
// Email ID
// Message (Optional)
// Date


const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  gender: { type: String, required: true },
  age_group: { type: String, required: true},
  height: { type: String, required: true},
  weight: { type: String, required: true},
  activity: { type: String, required: true },
  goal: { type: String, required: true},
  name: { type: String, required: true},
  phone: { type: String, required: true},
  email: { type: String, required: true},
  message: { type: String, required: false },
}, { timestamps: true });


const ProgramReach = mongoose.model("ProgramReach", schema);

module.exports = {
  ProgramReach: ProgramReach,
  messageSchema: schema,
};
