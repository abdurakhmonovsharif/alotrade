const { Schema, model, Joi } = require("../../packages");

const Message = new Schema(
  {
    message: { type: String },
    offer: { type: Schema.Types.ObjectId, ref: "Offer" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    isRead: { type: Boolean, default: false },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const validateMessage = (message) => {
  const schema = Joi.object({
    message: Joi.string(),
    offer: Joi.string(),
  });

  return schema.validate(message);
};

module.exports.validateMessage = validateMessage;
module.exports.Message = model("Message", Message);
