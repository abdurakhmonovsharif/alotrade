const {
  validateOrganization,
  validateUserSignUp,
} = require("../../models/validators");
const { Organization, User } = require("../../models/models");
const { bcrypt } = require("../../packages");
const {
  getOrganizationById,
  getOrganizations,
  getOrganizationsCount,
  getOrganization,
} = require("./constants");
const jwt = require("../../services/JwtService");

const createOrganization = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      name,
      region,
      district,
      password,
      email,
      phone,
      media,
      categories,
      subcategories,
      subcategories2,
      tradetypes,
      address,
      image,
    } = req.body;

    const { error } = validateUserSignUp({
      firstname,
      lastname,
      region,
      district,
      password,
      email,
      phone,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const phones = { phone1: phone };

    const { error: organizationError } = validateOrganization({
      name,
      phones,
      media,
      email,
      categories,
      subcategories,
      subcategories2,
      tradetypes,
      region,
      district,
      image,
    });

    if (organizationError) {
      return res.status(400).json({ message: organizationError.message });
    }

    const user = await User.findOne({ phone, isArchive: false });

    if (user) {
      return res.status(400).json({
        message: `Номер телефона уже зарегистрирован`,
      });
    }

    const organization = await Organization.findOne({
      name,
      isArchive: false,
    });

    if (organization) {
      return res.status(400).json({
        message: `Организация с таким названием ранее была зарегистрирована`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstname,
      lastname,
      region,
      district,
      password: hashPassword,
      email,
      phone,
    });
    await newUser.save();

    const newOrganization = new Organization({
      name,
      phones,
      media,
      email,
      categories,
      subcategories,
      subcategories2,
      user: newUser._id,
      region,
      district,
      tradetypes,
      address,
    });
    await newOrganization.save();

    newUser.organization = newOrganization._id;
    newOrganization.user = newUser._id;
    await newOrganization.save();

    const tokens = jwt.generateTokens({ id: newUser._id });

    newUser.token = tokens.refreshToken;
    await newUser.save();

    return res.status(200).json({
      token: tokens.accessToken,
      is_active: newOrganization.is_active,
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        phone: newUser.phone,
        image: newUser.image,
        _id: newUser._id,
        type: "organization",
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const {
      name,
      region,
      district,
      email,
      address,
      image,
      phones,
      media,
      categories,
      subcategories,
      tradetypes,
      id,
      description,
    } = req.body;

    const { error } = validateOrganization({
      name,
      phones,
      media,
      categories,
      subcategories,
      tradetypes,
      region,
      district,
      image,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const organization = await Organization.findOne({
      _id: id,
      isArchive: false,
    });
    if (!organization) {
      return res.status(400).json({
        message: `Организации с таким названием не существует`,
      });
    }

    organization.name = name;
    organization.image = image;
    organization.phones = phones;
    organization.media = media;
    organization.email = email;
    organization.region = region;
    organization.district = district;
    organization.categories = categories;
    organization.subcategories = subcategories;
    organization.tradetypes = tradetypes;
    organization.description = description;
    organization.address = address;
    await organization.save();

    const updated = await getOrganizationById(organization._id);

    res.status(200).json({ organization: updated });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const createNewOrganization = async (req, res) => {
  try {
    const {
      name,
      region,
      district,
      email,
      phone,
      media,
      image,
      categories,
      subcategories,
      tradetypes,
    } = req.body;

    const userId = req.user.id;

    const user = await User.findOne({ _id: userId, isArchive: false });

    if (user.organization) {
      return res.status(400).send({ message: "У вас уже есть организация" });
    }

    const phones = { phone1: user.phone, phone2: phone };

    const { error } = validateOrganization({
      name,
      media,
      phones,
      email,
      categories,
      subcategories,
      tradetypes,
      region,
      district,
      image,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const organization = await Organization.findOne({
      name,
      isArchive: false,
    });

    if (organization) {
      return res.status(400).json({
        message: `Организация с таким названием ранее была зарегистрирована`,
      });
    }

    const newOrganization = new Organization({
      name,
      phones,
      media,
      email,
      categories,
      subcategories,
      tradetypes,
      region,
      district,
      image,
      user: userId,
    });
    await newOrganization.save();

    user.organization = newOrganization.id;
    user.save();
    res.status(200).json(newOrganization);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOrganizationsByFilter = async (req, res) => {
  try {
    const {
      count,
      page,
      categories,
      subcategories,
      tradetypes,
      regions,
      districts,
      name,
    } = req.body;
    let query = { is_active: true, isArchive: false };
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
    if (name && name.length > 0) {
      query.name = new RegExp(".*" + name + ".*", "i");
    }
    const organizations = await getOrganizations({ count, page, query });
    res.status(200).json({ organizations });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOrganizationsByFilterCount = async (req, res) => {
  try {
    const { categories, subcategories, tradetypes, regions, districts, name } =
      req.body;
    let query = { is_active: true, isArchive: false };
    if (tradetypes.length > 0) {
      query.tradetypes = { $in: tradetypes };
    }
    if (districts.length) {
      query.district = { $in: districts };
    }
    if (regions.length) {
      query.region = { $in: regions };
    }
    if (categories.length) {
      query.categories = { $in: categories };
    }
    if (subcategories.length) {
      query.subcategories = { $in: subcategories };
    }
    if (name.length > 0) {
      query.name = new RegExp(".*" + name + ".*", "i");
    }
    const totalCount = await getOrganizationsCount({ query });
    res.status(200).json({ totalCount });
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getOrganizationByid = async (req, res) => {
  try {
    const { id } = req.body;
    const organization = await Organization.findOne({
      _id: id,
      isArchive: false,
    })
      .select("-__v -createdAt")
      .populate({ path: "categories", select: "_id name" })
      .populate({ path: "subcategories", select: "_id name" })
      .populate({ path: "subcategories2", select: "_id name" })
      .populate({ path: "tradetypes", select: "_id name" })
      .populate({
        path: "user",
        select: "firstname lastname image phone region district favorites",
        populate: [
          { path: "region", select: "name" },
          { path: "district", select: "name" },
        ],
      });

    if (!organization) {
      return res.status(400).json({ message: "Компания не найдена" });
    }
    res.status(200).json({ organization });
  } catch (e) {
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const getAllOrgs = async (req, res) => {
  try {
    const data = await getAllWithPopulate({ isArchive: false });
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const activateOrg = async (req, res) => {
  try {
    const org = await Organization.findOneAndUpdate(
      {
        _id: req.params.id,
        isArchive: false,
      },
      { is_active: true },
      { new: true }
    );

    if (!org) {
      return res.status(404).send({ errMsg: "Not Found" });
    }

    res.send(org);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

async function getAllWithPopulate(query = {}) {
  try {
    const data = await Organization.find(query)
      .sort({ createdAt: "desc" })
      .select("-__v -updatedAt -isArchive")
      .populate({ path: "categories", select: "_id name" })
      .populate({ path: "subcategories", select: "_id name" })
      .populate({ path: "subcategories2", select: "_id name" })
      .populate({ path: "tradetypes", select: "_id name" })
      .populate({
        path: "user",
        select: "-password -__v -createdAt -organization -token",
        populate: [
          { path: "region", select: "name _id" },
          { path: "district", select: "name _id" },
          { path: "favorites" },
        ],
      });
    return data;
  } catch (error) {
    throw new Error();
  }
}

async function removeOrg(req, res) {
  try {
    const { id } = req.params;

    const org = await Organization.findOneAndDelete({ _id: id });

    if (!org) {
      return res.status(404).send({ error: "Not found" });
    }

    await User.findOneAndUpdate(
      { organization: org.id },
      { organization: null }
    );

    res.status(200).send({ message: "success", id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
}
// const requestFillBalance = async (req, res) => {
//   try {
//     const { id, summa, fullname, card } = req.body;

//     const org = await Organization.findById(id);

//     if (!org) {
//       return res.status(404).seorganizationnd({ errMsg: "Not Found" });
//     }

//     const createBalance = await Balance.create({ summa, fullname, card });

//     org.balanceHistory.push([createBalance._id]);
//     await org.save();

//     res
//       .status(200)
//       .send({ msg: "Request to fill balance sent to admin successfully." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Ошибка в сервере..." });
//   }
// };

// const acceptFillBalance = async (req, res) => {
//   try {
//     const { id } = req.body;

//     const org = await Organization.findById(id).populate("balanceHistory");

//     org.balanceHistory.forEach(async (balance, ind) => {
//       if (!balance.is_accepted) {
//         org.totalBalance += balance.summa;
//         await Balance.findByIdAndUpdate(balance._id, { is_accepted: true });
//       }
//     });

//     await org.save();

//     res.status(200).send({ msg: "Balance successfully filled" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Ошибка в сервере..." });
//   }
// };

module.exports = {
  createOrganization,
  updateOrganization,
  createNewOrganization,
  getOrganizationsByFilter,
  getOrganizationsByFilterCount,
  getOrganizationByid,
  getAllOrgs,
  activateOrg,
  removeOrg,
  // requestFillBalance,
  // acceptFillBalance,
};
