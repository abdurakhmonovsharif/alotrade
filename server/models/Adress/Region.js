const { Schema, model, Joi } = require("../../packages");

const region = new Schema({
  name: { type: String, required: true },
  districts: [{ type: Schema.Types.ObjectId, ref: "District" }],
  isArchive: { type: Boolean, default: false },
});

const validateRegion = (region) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(region);
};

module.exports.validateRegion = validateRegion;
module.exports.Region = model("Region", region);
