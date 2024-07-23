const { Schema, model, Joi } = require("../../packages");

const adType = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    members: { type: Number, default: 0 },
    isArchive: { type: Boolean, default: false },
  },
  { versionKey: false, timeseries: true }
);

const validateAdType = (adType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    members: Joi.number(),
  });

  return schema.validate(adType);
};

const AdType = model("AdType", adType);
module.exports = {
  validateAdType,
  AdType,
};
