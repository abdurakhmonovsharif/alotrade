const { Schema, model, Joi } = require("../../packages");

const organization = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, email: true, lowercase: true },
    address: { type: String },
    image: { type: String },
    phones: {
      phone1: { type: String },
      phone2: { type: String },
      phone3: { type: String },
    },
    media: {
      instagram: { type: String },
      telegram: { type: String },
      site: { type: String },
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    district: { type: Schema.Types.ObjectId, ref: "District" },
    isArchive: { type: Boolean, default: false },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
    subcategories2: [{ type: Schema.Types.ObjectId, ref: "Subcategory2" }],
    tradetypes: [{ type: Schema.Types.ObjectId, ref: "TradeType" }],
    description: { type: String },
    is_active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateOrganization(organization) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phones: Joi.object().required(),
    address: Joi.string(),
    media: Joi.object(),
    email: Joi.string(),
    image: Joi.string().allow("").optional(),
    categories: Joi.array().required(),
    subcategories: Joi.array().optional(),
    subcategories2: Joi.array().optional(),
    tradetypes: Joi.array().required(),
    region: Joi.string(),
    district: Joi.string(),
    description: Joi.string(),
  });

  return schema.validate(organization);
}

module.exports.validateOrganization = validateOrganization;
module.exports.Organization = model("Organization", organization);
