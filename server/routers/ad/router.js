const {express} = require("./../../packages");
const AdType = require("./adType");
const AdPost = require("./adPost");
const router = express.Router();

const auth = require("../../middleware/auth.middleware");
const adminAuth = require("../../middleware/adminAuth");

// Ad Type
router.get("/type", auth, AdType.getAll);
router.post("/type", adminAuth, AdType.create);
router.put("/type/:id", adminAuth, AdType.update);
router.delete("/type/:id", adminAuth, AdType.remove);

// Ad Post
router.get("/post", adminAuth, AdPost.getAll);
router.post("/post", auth, AdPost.create);
router.get("/post/:id", AdPost.getById);
router.get("/post/get/:id", auth, AdPost.getByIdWithToken);
router.put("/post/:id", auth, AdPost.update);
router.patch("/post/updateMedia/:id", auth, AdPost.updateMedia);
router.delete("/post/:id", auth, AdPost.remove);
router.post("/post/confirm/:id", adminAuth, AdPost.confirm);
router.post("/post/publish/:id", adminAuth, AdPost.publish);
router.post("/post/foruser", auth, AdPost.forUser);
router.post("/post/get/getByFilter", AdPost.getAdPostByFilter);
router.post("/post/get/getStatistics/:id", auth, AdPost.getStatistics);
router.post("/post/set/interes", auth, AdPost.setInteres);

module.exports = router;
