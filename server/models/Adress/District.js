const { Schema, model, Joi } = require("../../packages");

const districts = new Schema({
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref: "Region" },
  isArchive: { type: Boolean, default: false },
});

const validateDistrict = (district) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    region: Joi.string().required(),
  });

  return schema.validate(district);
};

module.exports.validateDistrict = validateDistrict;
module.exports.District = model("District", districts);
