const { Category, Subcategory, Subcategory2 } = require("../../models/models");
const { validateCategory } = require("../../models/validators");
const { map } = require("lodash");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res
        .status(400)
        .json({ message: `${name} kategoriyasi avval yaratilgan` });
    }

    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, image, _id, tgChannellLink, tgChannellID, tgMembers } =
      req.body;

    const { error } = validateCategory({
      name,
      image,
      tgChannellLink,
      tgChannellID,
      tgMembers,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const category = await Category.findById(_id);

    if (!category) {
      return res.status(404).json({ message: "Kateriya topilmadi" });
    }

    category.name = name;
    category.image = image;
    category.tgChannellID = tgChannellID;
    category.tgChannellLink = tgChannellLink;
    category.tgMembers = tgMembers;
    await category.save();

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;

    const category = await Category.findByIdAndDelete(_id);

    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" });
    }

    category.subcategories.forEach(async (el) => {
      const sub = await Subcategory.findByIdAndDelete(el);

      sub.subcategories.forEach(async (el) => {
        await Subcategory2.findByIdAndDelete(el);
      });
    });

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate({
        path: "subcategories",
        model: Subcategory,
        populate: { path: "subcategories", model: Subcategory2 },
      })
      .sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .select("name image")
      .populate("subcategories", "name")
      .then((categories) =>
        map(categories, (category) => {
          return {
            label: category.name,
            value: category._id,
            image: category.image,
            subcategories: map(category.subcategories, (subcategory) => {
              return {
                label: subcategory.name,
                value: subcategory._id,
                category: category._id,
              };
            }),
          };
        })
      );
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithSubcategories,
  getCategories,
};
