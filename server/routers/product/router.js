const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const {
  createProduct,
  getProductsByFilter,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductPosition,
  getProductByOffer,
  getProductsByFilterCount,
  getOrganizationProducts,
} = require("./product");

router.post("/create", auth, createProduct);
router.post("/getbyfilter", getProductsByFilter);
router.post("/getbyfiltercount", getProductsByFilterCount);
router.post("/getbyid", getProductById);
router.put("/update", auth, updateProduct);
router.post("/delete", auth, deleteProduct);
router.put("/updateposition", auth, updateProductPosition);
router.post("/getbyoffer", auth, getProductByOffer);

module.exports = router;
