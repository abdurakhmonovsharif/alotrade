const { Schema, model, Joi } = require("../../packages");

const Product = new Schema(
  {
    tradetypes: [{ type: Schema.Types.ObjectId, ref: "TradeType" }],
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    district: { type: Schema.Types.ObjectId, ref: "District" },
    categories: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
    subcategories2: [{ type: Schema.Types.ObjectId, ref: "Subcategory2" }],
    name: { type: String, required: true },
    description: { type: String },
    status: { type: Array, required: true },
    currency: { type: String },
    minPrice: { type: Number, default: 0 },
    maxPrice: { type: Number, default: 0 },
    images: [{ type: String }],
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
    position: { type: String, required: true, default: "active" },
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const validateProduct = (product) => {
  const schema = Joi.object({
    tradetypes: Joi.array(),
    region: Joi.string(),
    district: Joi.string(),
    categories: Joi.array().required(),
    subcategories: Joi.array(),
    subcategories2: Joi.array(),
    name: Joi.string().required(),
    description: Joi.string(),
    status: Joi.array(),
    currency: Joi.string(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    images: Joi.array(),
    favorites: Joi.array(),
  });

  return schema.validate(product);
};

module.exports.validateProduct = validateProduct;
module.exports.Product = model("Product", Product);
