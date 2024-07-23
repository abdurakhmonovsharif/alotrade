const { AdPost } = require("../../models/Ad/AdPost");

async function getAllWithPopulate(query) {
  try {
    const ad = await AdPost.find(query)
      .populate({ path: "tradetypes" })
      .populate({ path: "region" })
      // .populate({ path: "district" })
      .populate({ path: "categories" })
      // .populate({ path: "subcategories" })
      // .populate({ path: "subcategories2" })
      .populate({ path: "adType" })
      // .populate({ path: "offers" })
      .populate({
        path: "favorites",
        populate: { path: "organization" },
      })
      .populate({
        path: "whoseen",
        populate: { path: "organization" },
      })
      .populate({
        path: "interest",
        populate: { path: "organization" },
      })
      .populate({
        path: "user",
        populate: { path: "organization" },
      })
      .sort({ createdAt: "desc" });

    return ad;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllWithPopulateForUser(query, page, count) {
  try {
    const ad = await AdPost.find(query)
      .skip(page * count)
      .limit(count)
      .populate({ path: "tradetypes", select: "name" })
      .populate({ path: "region", select: "name" })
      .populate({ path: "categories", select: "name" })
      .populate({
        path: "user",
        select: "firstname lastname phone image",
        populate: {
          path: "organization",
          select: "name email phones media image",
        },
      })
      .select(
        "user tradetypes region categories name images description favorites"
      )
      .sort({ createdAt: "desc" });

    return ad;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllWithPopulate, getAllWithPopulateForUser };
