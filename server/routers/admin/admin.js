const { Admin, User } = require("../../models/models");
const { validateAdmin } = require("../../models/validators");
const { bcrypt, config } = require("../../packages");
const jwt = require("../../services/JwtService");

const createAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const { error } = validateAdmin(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const candidate = await Admin.findOne({ phone });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Пользователь уже зарегистрирован" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({ phone, password: hashedPassword });

    const tokens = jwt.generateTokens({
      id: admin._id,
      is_admin: admin.is_admin,
    });
    admin.token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("REFRESH_TOKEN_MS"),
      httpOnly: true,
    });

    res.status(201).json({ token: tokens.accessToken });
  } catch (e) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    // const token = jwt.sign(
    //   {
    //     type: "admin",
    //     id: admin._id,
    //     is_admin: admin.is_admin,
    //   },
    //   config.get("JWT_SECRET"),
    //   { expiresIn: "12h" }
    // );

    const tokens = jwt.generateTokens({
      id: admin._id,
      is_admin: admin.is_admin,
    });
    admin.token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("REFRESH_TOKEN_MS"),
      httpOnly: true,
    });

    res.status(200).json({ token: tokens.accessToken });
  } catch (e) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const { error } = validateAdmin(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await Admin.findOneAndUpdate(
      { _id: req.user.id },
      { phone, password: hashedPassword }
    ).select("phone");

    res.json(admin);
  } catch (e) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const adminn = await Admin.findOne({ phone });
    if (!adminn) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const admin = await Admin.findOneAndDelete({ _id: req.user.id }).select(
      "phone"
    );
    res.json(admin);
  } catch (e) {
    console.log(error);
    res.status(500).json({ message: "Ошибка в сервере..." });
  }
};

async function logout(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(404).send({ error: "Token not found" });
    }

    const admin = await Admin.findOneAndUpdate(
      { token: refreshToken },
      { token: "" },
      { new: true }
    );

    if (!admin) {
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

    const adminDataFromCookie = await jwt.verifyRefresh(refreshToken);

    const adminDataFromDB = await Admin.findOne({ token: refreshToken });

    if (!adminDataFromCookie || !adminDataFromDB) {
      return res.status(401).send({ error: "Not authorized" });
    }

    const admin = await Admin.findById(adminDataFromCookie.id);
    if (!admin) {
      return res.status(401).send({ error: "Not authorized" });
    }

    const tokens = jwt.generateTokens({ id: admin._id });

    admin.token = tokens.refreshToken;
    await admin.save();

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

async function changeUserBalance(req, res) {
  try {
    const { userId, sum } = req.body;

    const user = await User.findOne({ _id: userId, isArchive: false });

    if (!user) {
      res.status(404).send({ error: "Not found" });
    }

    user.balance = sum;
    await user.save();

    res.status(200).send({ message: "success", userId, balance: user.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ошибка в сервере..." });
  }
}
module.exports = {
  createAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
  logout,
  getNewToken,
  changeUserBalance,
};
