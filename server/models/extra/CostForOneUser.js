const { Schema, model } = require("../../packages");

const costForOneUser = new Schema({
  sum: { type: Number },
  ordersum: { type: Number },
});

module.exports.CostForOneUser = model("CostForOneUser", costForOneUser);
