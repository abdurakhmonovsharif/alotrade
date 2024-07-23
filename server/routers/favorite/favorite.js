const { Product, User } = require("../../models/models");
const { AdPost } = require("../../models/Ad/AdPost");

const createFavorite = async (req, res) => {
  try {
    const { productId, postId } = req.body;
    const { id } = req.user;

    const user = await User.findOne({ _id: id, isArchive: false });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (productId) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }

      if (
        user.favorites.includes(product.id) ||
        product.favorites.includes(user.id)
      ) {
        return res
          .status(400)
          .send({ error: "Product already exists in your favoriteslist" });
      }
      user.favorites.push(product.id);

      product.favorites.push(user.id);

      await product.save();
      await user.save();

      return res.status(200).send({ userId: user.id, productId: product.id });
    } else {
      const post = await AdPost.findById(postId);

      if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }
      if (
        user.favoritePosts.includes(post.id) ||
        post.favorites.includes(user.id)
      ) {
        return res
          .status(400)
          .send({ error: "Ad already exists in your favoriteslist" });
      }

      user.favoritePosts.push(post.id);

      post.favorites.push(user.id);

      await post.save();
      await user.save();
      return res.status(200).send({ userId: user.id, postId: post.id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { user, page, count } = req.body;

    const products = await Product.find({ favorites: user })
      .populate({
        path: "region",
        select: "name",
        populate: {
          path: "districts",
          select: "name",
        },
      })
      .populate("district", "name")
      .populate({
        path: "categories",
        select: "name",
        populate: {
          path: "subcategories",
          select: "name",
        },
      })
      .populate("subcategories", "name")
      .populate("subcategories2", "name")
      .populate("user", "firstname lastname phone email image")
      .populate({
        path: "organization",
        select: "name phones email region district image",
        populate: {
          path: "region",
          select: "name",
        },
      })
      .populate({
        path: "organization",
        select: "name phones email region district image",
        populate: {
          path: "district",
          select: "name",
        },
      })
      .skip(page * count)
      .limit(count);

    res.status(200).json({ data: products, totalCount: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostFavorites = async (req, res) => {
  try {
    const { user, page, count } = req.body;

    const posts = await AdPost.find({ favorites: user })
      .populate({ path: "tradetypes", select: "name" })
      .populate({ path: "region", select: "name" })
      .populate({ path: "categories", select: "name" })
      .populate({
        path: "user",
        select: "firstname lastname image phone email",
        populate: {
          path: "organization",
          select: "name phones email region district image",
        },
      })
      .sort({ createdAt: "desc" })
      .select("-target")
      .skip(page * count)
      .limit(count);

    posts.reverse();
    res.status(200).json({ data: posts, totalCount: posts.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    await User.findOneAndUpdate(
      { _id: userId, isArchive: false },
      {
        $pullAll: {
          favorites: [productId],
        },
      }
    );
    await Product.findByIdAndUpdate(productId, {
      $pullAll: {
        favorites: [userId],
      },
    });

    res.status(200).json({ productId, userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePostFavorite = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pullAll: {
          favoritePosts: [postId],
        },
      }
    );
    await AdPost.findByIdAndUpdate(postId, {
      $pullAll: {
        favorites: [userId],
      },
    });

    res.status(200).json({ postId, userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFavorite,
  getFavorites,
  deleteFavorite,
  getPostFavorites,
  deletePostFavorite,
};
