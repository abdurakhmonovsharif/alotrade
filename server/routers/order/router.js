const router = require("express").Router();
const adminAuth = require("../../middleware/adminAuth");
const auth = require("../../middleware/auth.middleware");
const {
  createOrder,
  getOrdersByFilter,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderPosition,
  getOrderByOffer,
  getOrdersByFilterCount,
  getAll,
  confirmOrder,
  publishOrder,
  forUser,
  getByIdWithToken,
} = require("./order");

router.get("/getAll", adminAuth, getAll);
router.post("/create", auth, createOrder);
router.post("/getbyfilter", getOrdersByFilter);
router.post("/getbyfiltercount", getOrdersByFilterCount);
router.post("/getbyid", getOrderById);
router.post("/get/getbyid", auth, getByIdWithToken);
router.put("/update", auth, updateOrder);
router.post("/delete", auth, deleteOrder);
router.put("/updateposition", auth, updateOrderPosition);
router.post("/getbyoffer", auth, getOrderByOffer);
router.post("/confirm/:id", adminAuth, confirmOrder);
router.post("/publish/:id", adminAuth, publishOrder);
router.post("/foruser", auth, forUser);

module.exports = router;
