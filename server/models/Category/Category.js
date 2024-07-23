const { Schema, model, Joi } = require("../../packages");

const category = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
  tgChannellLink: { type: String },
  tgChannellID: { type: String },
  tgMembers: { type: Number },
  isArchive: { type: Boolean, default: false },
});

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    subcategories: Joi.array(),
    tgChannellLink: Joi.string(),
    tgChannellID: Joi.string(),
    tgMembers: Joi.number(),
  });

  return schema.validate(category);
};

module.exports.validateCategory = validateCategory;
module.exports.Category = model("Category", category);
