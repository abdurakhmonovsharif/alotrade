const {
  createTradeType,
  getTradeTypes,
  deleteTradeType,
  updateTradeType,
} = require("./tradeType");
const router = require("express").Router();
const adminAuth = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth.middleware");

router.post("/tradetype/create", adminAuth, createTradeType);
router.get("/tradetype/get", getTradeTypes);
router.delete("/tradetype/delete", adminAuth, deleteTradeType);
router.put("/tradetype/update", adminAuth, updateTradeType);

module.exports = router;
