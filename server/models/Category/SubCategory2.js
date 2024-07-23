const { Schema, model, Joi } = require("../../packages");

const subcategory2 = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  subcategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
  isArchive: { type: Boolean, default: false },
});

module.exports.Subcategory2 = model("Subcategory2", subcategory2);
