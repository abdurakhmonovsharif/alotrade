const jwt = require("../services/JwtService");
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Вы не авторизованы" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Вы не авторизованы" });
    }
    const decoded = await jwt.verifyAccess(token);

    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: e.message });
  }
};
