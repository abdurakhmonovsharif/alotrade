const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const {
  createFavorite,
  getFavorites,
  deleteFavorite,
  getPostFavorites,
  deletePostFavorite,
} = require("./favorite");

router.post("/create", auth, createFavorite);
router.post("/get", auth, getFavorites);
router.post("/getPosts", auth, getPostFavorites);
router.post("/delete", auth, deleteFavorite);
router.post("/deletePosts", auth, deletePostFavorite);

module.exports = router;
