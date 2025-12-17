const jwt = require("jsonwebtoken");

const generateAccTkn = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SEC);

  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SEC);
  return decoded;
};

module.exports = { generateAccTkn, verifyToken };
