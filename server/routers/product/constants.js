const { Product } = require("../../models/models");
const { map } = require("lodash");

const queryProducts = (req) => {
  const {
    product: productFilter,
    categories,
    subcategories,
    subcategories2,
    tradetypes,
    regions,
    districts,
    user,
    name,
    organization,
  } = req.body;
  let query = {};
  if (organization) {
    query.organization = organization;
  }
  if (tradetypes && tradetypes.length > 0) {
    query.tradetypes = { $in: tradetypes };
  }
  if (districts && districts.length) {
    query.district = { $in: districts };
  }
  if (regions && regions.length) {
    query.region = { $in: regions };
  }
  if (categories && categories.length) {
    query.categories = { $in: categories };
  }
  if (subcategories && subcategories.length) {
    query.subcategories = { $in: subcategories };
  }
  if (subcategories2 && subcategories2.length) {
    query.subcategories2 = { $in: subcategories2 };
  }
  if (productFilter && productFilter === "my") {
    query.user = user;
  }
  if (name && name.length > 0) {
    query.name = new RegExp(".*" + name + ".*", "i");
  }

  return query;
};

const getProduct = async (id) =>
  await Product.findById(id)
    .populate("region", "name")
    .populate("district", "name")
    .populate("categories", "name")
    .populate("subcategories", "name")
    .populate("subcategories2", "name")
    .populate("tradetypes", "name")
    .populate("user")
    .populate("organization");

const getProducts = async ({ page, count, query }) =>
  await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(page * count)
    .limit(count)
    .select("-updatedAt -__v")
    .populate("region", "name")
    .populate("district", "name")
    .populate("categories", "name")
    .populate("subcategories", "name")
    .populate("tradetypes", "name")
    .populate("user", "firstname lastname phone image")
    .populate("organization", "phones media image name address");

const getProductsCount = async ({ query }) => await Product.find(query).count();

const getProductWithId = async (id) =>
  await Product.findById(id)
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
      select: "name phones media email region district image address",
      populate: {
        path: "region",
        select: "name",
      },
    })
    .populate({
      path: "organization",
      select: "name email region district image phones media address",
      populate: {
        path: "district",
        select: "name",
      },
    })
    .then((product) => {
      return {
        _id: product?._id,
        name: product?.name,
        description: product?.description,
        images: product?.images,
        minPrice: product?.minPrice,
        maxPrice: product?.maxPrice,
        currency: product?.currency,
        position: product?.position,
        tradetypes: product?.tradetypes,
        status: product?.status,
        organization: {
          _id: product?.organization?._id,
          name: product?.organization?.name,
          phones: product?.organization?.phones,
          media: product?.organization?.media,
          region: product?.organization?.region.name,
          district: product?.organization?.district.name,
          image: product?.organization?.image,
          address: product?.organization?.address,
        },
        district: {
          label: product?.district?.name,
          value: product?.district?._id,
        },
        region: {
          label: product?.region?.name,
          value: product?.region?._id,
          districts: map(product?.region?.districts, (district) => {
            return { label: district.name, value: district._id };
          }),
        },
        categories: map(product?.categories, (category) => {
          return {
            label: category.name,
            value: category._id,
            subcategories: map(category?.subcategories, (subcategory) => {
              return { label: subcategory.name, value: subcategory._id };
            }),
          };
        }),
        subcategories: map(product?.subcategories, (subcategory) => {
          return { label: subcategory.name, value: subcategory._id };
        }),
        subcategories2: map(product?.subcategories2, (subcategory) => {
          return { label: subcategory.name, value: subcategory._id };
        }),
      };
    });

const getProductForUpdate = async (id) =>
  await Product.findById(id)
    .select("-updatedAt -__v")
    .populate("region", "name")
    .populate("district", "name")
    .populate("categories", "name")
    .populate("subcategories", "name")
    .populate("tradetypes", "name")
    .populate("user", "firstname lastname phone email")
    .populate("organization", "name phone email");

const getProductForOffer = async (id) =>
  await Product.findById(id)
    .populate({
      path: "region",
      select: "name",
    })
    .populate("district", "name")
    .populate({
      path: "categories",
      select: "name",
    })
    .populate("subcategories", "name")
    .populate("tradetypes", "name")
    .populate("user", "firstname lastname phone email")
    .populate("organization", "name phone email");

module.exports = {
  getProduct,
  getProductWithId,
  getProducts,
  getProductForUpdate,
  getProductForOffer,
  getProductsCount,
  queryProducts,
};
