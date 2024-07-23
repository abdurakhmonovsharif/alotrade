const { Schema, model, Joi } = require("../../packages");

const Offer = new Schema(
  {
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    offererUser: { type: Schema.Types.ObjectId, ref: "User" },
    offererOrganization: { type: Schema.Types.ObjectId, ref: "Organization" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const validateOffer = (offer) => {
  const schema = Joi.object({
    messages: Joi.array(),
    organization: Joi.string().required(),
    user: Joi.string().required(),
    order: Joi.string(),
    product: Joi.string(),
  });

  return schema.validate(offer);
};

module.exports.validateOffer = validateOffer;
module.exports.Offer = model("Offer", Offer);
