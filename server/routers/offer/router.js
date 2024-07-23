const {
  createOffer,
  getOffers,
  getMessagesByOffer,
  getOfferByUser,
  createMessage,
  getMessageById,
  getOfferByid,
} = require("./offer");
const router = require("express").Router();
const auth = require("./../../middleware/auth.middleware");
const adminAuth = require("../../middleware/adminAuth");

router.post("/create", auth, createOffer);
router.post("/createmessage", auth, createMessage);
router.post("/getoffers", adminAuth, getOffers);
router.post("/getmessagesbyoffer", auth, getMessagesByOffer);
router.post("/getofferbyuser", auth, getOfferByUser);
router.post("/getofferbyid", auth, getOfferByid);
router.post("/getmessagebyid", auth, getMessageById);

module.exports = router;
