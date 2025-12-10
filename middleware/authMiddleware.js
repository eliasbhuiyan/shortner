const { verifyToken } = require("../utils/tokens");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.acc_token;
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
};

module.exports = { authMiddleware };
