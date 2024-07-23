const { express } = require("./../../packages");
const router = express.Router();
const {
  createRegion,
  updateRegion,
  deleteRegion,
  getRegions,
} = require("./region");
const {
  createDistrict,
  updateDistrict,
  deleteDistrict,
  getDistrictsByRegion,
  createDistricts,
} = require("./district");
const auth = require("./../../middleware/auth.middleware");
const adminAuth = require("./../../middleware/adminAuth");

// Regions
router.post("/region/create", adminAuth, createRegion);
router.put("/region/update", adminAuth, updateRegion);
router.delete("/region/delete", adminAuth, deleteRegion);
router.get("/region/getall", getRegions);

// Districts
router.post("/district/create", adminAuth, createDistrict);
router.put("/district/update", adminAuth, updateDistrict);
router.delete("/district/delete", adminAuth, deleteDistrict);
router.post("/district/getallbyregion", getDistrictsByRegion);
// router.post("/district/createall", createDistricts);

module.exports = router;
