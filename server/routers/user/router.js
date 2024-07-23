const router = require("express").Router();
const {
  createUser,
  updateUser,
  getUserData,
  deleteUser,
  signInUser,
  updatePassword,
  getAll,
  getCount,
  logout,
  getNewToken,
} = require("./user");
const {
  createOrganization,
  createNewOrganization,
  updateOrganization,
  getOrganizationsByFilter,
  getOrganizationsByFilterCount,
  getOrganizationByid,
  getAllOrgs,
  activateOrg,
  removeOrg,
} = require("./organization");
const { paymeCheckToken } = require("../../middleware/transaction.middleware");

const auth = require("../../middleware/auth.middleware");
const HomeController = require("./payment");
const adminAuth = require("../../middleware/adminAuth");

// Main
router.get("/getAll", adminAuth, getAll);
router.post("/signup", createUser);
router.put("/update", auth, updateUser);
router.post("/getuserbyid", auth, getUserData);
router.delete("/delete", adminAuth, deleteUser);
router.post("/signin", signInUser);
router.put("/updatepassword", auth, updatePassword);
router.get("/getcount", auth, getCount);
router.get("/logout", auth, logout);
router.get("/newToken", getNewToken);
router.post(
  "/payments/payme",
  paymeCheckToken,
  HomeController.HomePostController
);

// Organization
router.get("/organization/getAll", adminAuth, getAllOrgs);
router.post("/organization/activate/:id", adminAuth, activateOrg);
// router.post("/organization/reqfillbalance", requestFillBalance);
// router.post("/organization/acceptfillbalance", acceptFillBalance);

router.post("/organization/create", createOrganization);
router.put("/organization/update", auth, updateOrganization);
router.post("/organization/new", auth, createNewOrganization);
router.post("/organization/getall", getOrganizationsByFilter);
router.post("/organization/getallcount", getOrganizationsByFilterCount);
router.post("/organization/getbyid", getOrganizationByid);
router.delete("/organization/remove/:id", auth, removeOrg);

module.exports = router;
