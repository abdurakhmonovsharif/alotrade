const router = require("express").Router();
const adminAuth = require("../../middleware/adminAuth");
const BgImg = require("./bgImg");
const Cost = require("./cost");

router.post("/bgimg", adminAuth, BgImg.create);
router.get("/bgimg", BgImg.getAll);
router.get("/bgimg/:id", BgImg.getOne);
router.patch("/bgimg/:id", adminAuth, BgImg.update);
router.delete("/bgimg/:id", adminAuth, BgImg.remove);

router.post("/cost", adminAuth, Cost.create);
router.get("/cost", Cost.getAll);
router.get("/cost/:id", Cost.getOne);
router.patch("/cost/:id", adminAuth, Cost.update);
router.delete("/cost/:id", adminAuth, Cost.remove);

module.exports = router;
