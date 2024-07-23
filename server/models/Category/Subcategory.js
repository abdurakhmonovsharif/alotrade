const { Schema, model, Joi } = require("../../packages");

const subcategory = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory2" }],
  isArchive: { type: Boolean, default: false },
});

const validateSubcategory = (subcategory) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    category: Joi.string().required(),
  });

  return schema.validate(subcategory);
};

module.exports.validateSubcategory = validateSubcategory;
module.exports.Subcategory = model("Subcategory", subcategory);
