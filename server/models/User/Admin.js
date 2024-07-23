const { Schema, model, Joi } = require("../../packages");

const admin = new Schema(
  {
    phone: { type: String, unique: true },
    password: { type: String, min: 6, required: true },
    isArchive: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

function validateAdmin(admin) {
  const schema = Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(admin);
}

module.exports.validateAdmin = validateAdmin;
module.exports.Admin = model("Admin", admin);
