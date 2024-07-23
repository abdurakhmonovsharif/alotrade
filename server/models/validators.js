const { validateUserSignIn, validateUserSignUp } = require("./User/User");
const { validateOrganization } = require("./User/Organization");
const { validateRegion } = require("./Adress/Region");
const { validateDistrict } = require("./Adress/District");
const { validateCategory } = require("./Category/Category");
const { validateSubcategory } = require("./Category/Subcategory");
const { validateAdmin } = require("./User/Admin");
const { validateTradeType } = require("./Trade/TradeType");
const { validateOrder } = require("./Order/Order");
const { validateProduct } = require("./Product/Product");
const { validateOffer } = require("./Offer/Offer");
const { validateMessage } = require("./Offer/Message");

module.exports = {
  validateTradeType,
  validateUserSignIn,
  validateUserSignUp,
  validateOrganization,
  validateRegion,
  validateDistrict,
  validateCategory,
  validateSubcategory,
  validateProduct,
  validateOrder,
  validateOffer,
  validateMessage,
  validateAdmin,
};
