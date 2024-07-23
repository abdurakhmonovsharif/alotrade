const { Schema, model, Joi } = require("../../packages");

const tradeType = new Schema(
  {
    name: { type: String, unique: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateTradeType(tradeType) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(tradeType);
}

module.exports.validateTradeType = validateTradeType;
module.exports.TradeType = model("TradeType", tradeType);
