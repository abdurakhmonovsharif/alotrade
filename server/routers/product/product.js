const { validateProduct } = require("../../models/validators");
const { Product, Organization } = require("../../models/models");
const {
  getProduct,
  getProductWithId,
  getProducts,
  getProductForUpdate,
  getProductForOffer,
  getProductsCount,
  queryProducts,
} = require("./constants");

const createProduct = async (req, res) => {
  try {
    const id = req.user.id;
    const { error } = validateProduct(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const organization = await Organization.findOne({
      user: id,
      isArchive: false,
    });

    const newProduct = new Product({
      ...req.body,
      user: id,
    });

    if (organization) {
      newProduct.organization = organization._id;
    }

    await newProduct.save();

    const product = await getProduct(newProduct._id);

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByFilter = async (req, res) => {
  try {
    const { count, page } = req.body;

    const query = queryProducts(req);

    const products = await getProducts({ count, page, query });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ Serverda: "Ошибка в сервере..." });
  }
};

const getProductsByFilterCount = async (req, res) => {
  try {
    const query = queryProducts(req);

    const totalCount = await getProductsCount({ query });

    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ Serverda: "Ошибка в сервере..." });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await getProductWithId(id);

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.body;

    delete req.body.id;

    const { error } = validateProduct(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const product = await getProduct(id);

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await Product.findByIdAndDelete(id);

    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductPosition = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedProduct = await Product.findById(id);

    if (!updatedProduct) {
      return res.status(400).json({ message: "Заказ не найден" });
    }

    updatedProduct.position =
      updatedProduct.position === "active" ? "unactive" : "active";
    await updatedProduct.save();

    const product = await getProductForUpdate(id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getProductByOffer = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await getProductForOffer(id);

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

module.exports = {
  createProduct,
  getProductsByFilter,
  getProductsByFilterCount,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductPosition,
  getProductByOffer,
};
