const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithSubcategories,
} = require("./category");
const {
  createSubcategory,
  getSubcategories,
  createSubcategories,
  update,
  remove,
} = require("./subcategory");
const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const adminAuth = require("../../middleware/adminAuth");
const {
  createSubcategory2,
  getSubcategories2,
  createSubcategories2,
  updateSubcategory2,
  removeSubcategory2,
} = require("./subcategory2");

// Category
router.post("/create", adminAuth, createCategory);
router.put("/update", adminAuth, updateCategory);
router.delete("/delete", adminAuth, deleteCategory);
router.get("/get", getCategories);
router.get("/getwithsubcategories", getCategoriesWithSubcategories);

// Subcategory
router.post("/subcategory/create", adminAuth, createSubcategory);
router.post("/subcategories/getbycategory",  getSubcategories);
router.post("/subcategories/create", adminAuth, createSubcategories);
router.put("/subcategory/update", adminAuth, update);
router.delete("/subcategory/remove/:id", adminAuth, remove);

// Subcategory2
router.post("/subcategory2/create", adminAuth, createSubcategory2);
router.post("/subcategories2/getbycategory", getSubcategories2);
router.post("/subcategories2/create", adminAuth, createSubcategories2);
router.put("/subcategory2/update", adminAuth, updateSubcategory2);
router.delete("/subcategory2/remove/:id", adminAuth, removeSubcategory2);

module.exports = router;
