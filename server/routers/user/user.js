const { User, Organization } = require("../../models/models");
const { validateUserSignUp } = require("../../models/validators");
const { bcrypt, config } = require("../../packages");
const jwt = require("../../services/JwtService");
const { getOrganizationById, getUserById } = require("./constants");

const getAll = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -__v -token")
      .populate({
        path: "region",
        select: "name _id",
        populate: { path: "districts", select: "name _id" },
      })
      .populate({ path: "district", select: "name _id" })
      .populate({ path: "organization", select: "name" })
      .populate("favorites")
      .sort({ createdAt: -1 });

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = validateUserSignUp(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    const { phone, password } = req.body;
    const user = await User.findOne({ phone, isArchive: false });
    if (user) {
      return res.status(400).json({
        message: `Номер телефона уже зарегистрирован`,
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      ...req.body,
      password: passwordHash,
    });

    await newUser.save();
    const userData = await getUserById(newUser.id);
    const organization =
      userData.organization &&
      (await getOrganizationById(userData.organization));

    // const token = await jwt.sign(
    //   { id: newUser._id },
    //   config.get("JWT_SECRET"),
    //   { expiresIn: config.get("jwtExpire") },
    //   (err) => {
    //     if (err) {
    //       return res.status(400).json({
    //         error: err.message,
    //       });
    //     }
    //   }
    // );
    const tokens = jwt.generateTokens({ id: newUser._id });

    await User.findByIdAndUpdate(userData._id, { token: tokens.refreshToken });

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("REFRESH_TOKEN_MS"),
      httpOnly: true,
    });

    return res.status(200).json({
      token: tokens.accessToken,
      user: { ...userData },
      organization,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Ошибка в сервере..." });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      image,
      phone,
      region,
      district,
      email,
      password,
      newPassword,
    } = req.body;
    const { id } = req.user;
    const user = await User.findOne({ _id: id, isArchive: false });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден!" });
    }
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.image = image || user.image;
    user.region = region || user.region;
    user.district = district || user.district;

    if (email) {
      const userEmail = await User.findOne({ email, isArchive: false });
      if (userEmail && userEmail._id.toString() !== id) {
        return res
          .status(400)
          .json({ message: "Электронная почта уже зарегистрирована!" });
      }
      user.email = email;
    }

    if (phone) {
      const userPhone = await User.findOne(
        { phone, isArchive: false }
        // { $and: [{ phone }, { isArchive: false }] }
      );
      // console.log(userPhone);
      // console.log(userPhone.id, id);
      if (userPhone && userPhone?.id !== id) {
        return res
          .status(400)
          .json({ message: "Этот номер телефона уже зарегистрирован!" });
      }
      user.phone = phone;
    }

    if (newPassword) {
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const passwordHash = bcrypt.hash(newPassword, 12);
      user.password = passwordHash;
    }
    await user.save();

    const userData = await getUserById(id);

    res.status(200).json({
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
};

const getUserType = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ _id: id, isArchive: false }).select(
      "-password"
    );
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден!" });
    }
    res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      image: user.image,
      _id: user._id,
      type: user.organization ? "organization" : "user",
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
};

const getUserData = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);

    if (!user) {
      return res.status(401).json({ message: "Вы не авторизованы" });
    }

    const organization =
      user.organization && (await getOrganizationById(user.organization));

    res.status(200).json({ user, organization });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден!" });
    }

    if (user.organization) {
      const org = await Organization.findOneAndDelete({
        _id: user.organization,
      });
    }

    res.status(200).json({ message: "Foydalanuvchi o'chirildi!", id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
};

const signInUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone, isArchive: false });

    // console.log(phone, password);
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден!" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    // console.log(user.id);

    const userData = await getUserById(user.id);

    // console.log(userData);
    const organization =
      userData.organization &&
      (await getOrganizationById(userData.organization));

    const tokens = jwt.generateTokens({ id: user.id });

    await User.findByIdAndUpdate(user._id, { token: tokens.refreshToken });

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("REFRESH_TOKEN_MS"),
      httpOnly: true,
    });

    return res.status(200).json({
      token: tokens.accessToken,
      user: { ...userData },
      organization,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await User.findOne({
      $and: [{ _id: req.user.id }, { isArchive: false }],
    });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Текущий пароль неверный" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    user.password = passwordHash;
    await user.save();
    res.status(200).json({ message: "Пароль успешно изменен!" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
};

async function getCount(req, res) {
  try {
    const { count } = req.query;

    const result = { count: 0, data: [] };
    let data;
    if (count == "all") {
      const users = await User.find({ organization: null, isArchive: false });

      // .select(
      //   "district region -_id"
      // );
      const orgs = await Organization.find({
        is_active: true,
        isArchive: false,
      });
      // .select(
      //   "district region categories subcategories subcategories2 tradetypes -_id"
      // );
      result.count += users.length + orgs.length;
      // result.data = [...orgs, ...users];
    } else if (count == "users") {
      data = await User.find({ organization: null, isArchive: false }).select(
        "district region -_id"
      );
      result.data = data;
      result.count = data.length;
    } else if (count == "orgs") {
      data = await Organization.find({
        is_active: true,
        isArchive: false,
      }).select(
        "district region categories subcategories subcategories2 tradetypes -_id"
      );
      result.data = data;
      result.count = data.length;
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(404).send({ error: "Token not found" });
    }

    const user = await User.findOneAndUpdate(
      { token: refreshToken },
      { token: "" },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "Token not found" });
    }

    res.clearCookie("refreshToken");

    res.status(200).send({ message: "Successfully logouted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
}

async function getNewToken(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(404).send({ error: "Token not found" });
    }

    const userDataFromCookie = await jwt.verifyRefresh(refreshToken);

    const userDataFromDB = await User.findOne({ token: refreshToken });

    if (!userDataFromCookie || !userDataFromDB) {
      return res.status(401).send({ error: "Not authorized" });
    }

    const user = await User.findOne({
      _id: userDataFromCookie.id,
      isArchive: false,
    });
    if (!user) {
      return res.status(401).send({ error: "Not authorized" });
    }

    const tokens = jwt.generateTokens({ id: user._id });

    user.token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("REFRESH_TOKEN_MS"),
      httpOnly: true,
    });

    res.status(200).send({ token: tokens.accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
}

module.exports = {
  createUser,
  updateUser,
  getUserData,
  deleteUser,
  signInUser,
  getUserType,
  updatePassword,
  getAll,
  getCount,
  logout,
  getNewToken,
};
