const { Schema, model } = require("../../packages");

const bgImg = new Schema({
  name: { type: String },
  image: { type: String },
  extraimg1: { type: String },
  extraimg2: { type: String },
});

module.exports.BgImg = model("BgImg", bgImg);
