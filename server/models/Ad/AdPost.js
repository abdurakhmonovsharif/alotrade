const { Schema, model, Joi } = require("../../packages");
const adViewEnum = ["all", "users", "orgs"];

const AdPost = new Schema(
  {
    tradetypes: [{ type: Schema.Types.ObjectId, ref: "TradeType" }],
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    // district: { type: Schema.Types.ObjectId, ref: "District" },
    categories: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    // subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
    // subcategories2: [{ type: Schema.Types.ObjectId, ref: "Subcategory2" }],
    name: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    // offers: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
    is_confirmed: { type: Boolean, default: false },
    is_published: { type: Boolean, default: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    whoseen: [{ type: Schema.Types.ObjectId, ref: "User" }],
    interest: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isArchive: { type: Boolean, default: false },
    adType: [{ type: Schema.Types.ObjectId, ref: "AdType" }],
    totalSum: { type: Number, default: 0 },
    target: {
      target_tradetypes: [{ type: Schema.Types.ObjectId, ref: "TradeType" }],
      target_region: [{ type: Schema.Types.ObjectId, ref: "Region" }],
      target_district: [{ type: Schema.Types.ObjectId, ref: "District" }],
      target_categories: [
        { type: Schema.Types.ObjectId, ref: "Category", required: true },
      ],
      target_subcategories: [
        { type: Schema.Types.ObjectId, ref: "Subcategory" },
      ],
      target_subcategories2: [
        { type: Schema.Types.ObjectId, ref: "Subcategory2" },
      ],
      adView: { type: String },
      adViewCount: { type: Number, default: 0 },
      costForOneUser: { type: Schema.Types.ObjectId, ref: "CostForOneUser" },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const validateAdPost = (post) => {
  const schema = Joi.object({
    tradetypes: Joi.array(),
    region: Joi.string(),
    // district: Joi.string(),
    categories: Joi.array(),
    // subcategories: Joi.array(),
    // subcategories2: Joi.array(),
    // favorites: Joi.array(),
    name: Joi.string().required(),
    description: Joi.string(),
    adType: Joi.array(),
    images: Joi.array().required(),
    user: Joi.string(),
    target: {
      target_tradetypes: Joi.array().optional(),
      target_region: Joi.array().optional(),
      target_categories: Joi.array().optional(),
      adView: Joi.string()
        .optional()
        .valid(...adViewEnum),
      adViewCount: Joi.number().optional(),
      costForOneUser: Joi.string().optional(),
    },
  });

  return schema.validate(post);
};

module.exports.validateAdPost = validateAdPost;
module.exports.AdPost = model("AdPost", AdPost);
