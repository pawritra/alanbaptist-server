const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  headerImage: [{ title: "string", image: "string" }],
  author: { type: "string" },
  target: { type: "string" },
  slug: { type: "string", required: true },
  title: { type: "string", required: true },
  client: { type: String },
  coach: [{ name: String, image: String, designation: String }],
  coach_designation: { type: String },
  brands: { type: String },
  summary: { type: "string", required: true },
  date: { type: String, default: Date.now() },
  featured: { type: Boolean, default: false },
  body: [{ id: Number, heading: String, paragraph: String }],
  category: { type: "string", required: true },
  subcategory: { type: "string", required: true },
  gallery: [{ image: "string", title: "string" }],
  sequence: { type: Number, unique: true },
  content: [{ id: "string", title: "string" }],
  transformation_story: { type: Boolean, default: false },
  transformation_image: { type: String, required: false },
  coaches: [
    { type: Schema.Types.ObjectId, ref: 'Employee' }
  ]
});
schema.index({ title: "text", summary: "text" });

const Blog = mongoose.model("Blog", schema);

module.exports = {
  Blog: Blog,
  blogSchema: schema,
};
