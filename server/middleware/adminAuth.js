const jwt = require("../services/JwtService");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Вы не авторизованы" });
    }
    const decoded = await jwt.verifyAccess(token);

    if (!decoded.is_admin) {
      return res.status(401).json({ message: "Вы не авторизованы" });
    }

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Вы не авторизованы" });
  }
};
