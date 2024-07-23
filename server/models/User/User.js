const { Schema, model, Joi } = require("../../packages");

const user = new Schema(
  {
    firstname: { type: String, required: true, trim: true, capitalize: true },
    lastname: { type: String, required: true, trim: true, capitalize: true },
    email: { type: String, email: true, lowercase: true },
    image: { type: String },
    phone: { type: String },
    password: { type: String, min: 6, required: true },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    district: { type: Schema.Types.ObjectId, ref: "District" },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    favoritePosts: [{ type: Schema.Types.ObjectId, ref: "AdPost" }],
    isArchive: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

function validateUserSignUp(user) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().optional(),
    image: Joi.string().allow("").optional(),
    password: Joi.string().required(),
    region: Joi.string().required(),
    district: Joi.string().required(),
    favorites: Joi.array().optional(),
  });

  return schema.validate(user);
}

function validateUserSignIn(user) {
  const schema = Joi.object({
    phone: Joi.string().required(),
    login: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports.validateUserSignUp = validateUserSignUp;
module.exports.validateUserSignIn = validateUserSignIn;
module.exports.User = model("User", user);
