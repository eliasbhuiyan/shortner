const { verifyToken } = require("../utils/tokens");

const isAuthentic = (req, res, next) => {
  try {
    const token = req.headers.acc_token;
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
};

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.acc_token;
    const decoded = verifyToken(token);
    if (!decoded)
      return res.status(401).send({ message: "Unauthorized request" });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send("Unauthorize request");
  }
};

module.exports = { isAuthentic, authMiddleware };
