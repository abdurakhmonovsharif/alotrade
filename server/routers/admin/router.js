const express = require("express");
const router = express.Router();
const {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logout,
  getNewToken,
  changeUserBalance,
} = require("./admin");
const adminAuth = require("../../middleware/adminAuth");

router.post("/create", createAdmin);
router.put("/update", adminAuth, updateAdmin);
router.delete("/delete", adminAuth, deleteAdmin);
router.post("/login", loginAdmin);
router.get("/logout", adminAuth, logout);
router.get("/newToken", getNewToken);
router.post("/changebalance", adminAuth, changeUserBalance);

module.exports = router;
