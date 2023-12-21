const jwt = require("jsonwebtoken");
const secretKey = "promueveMas2024*";

const verifyJwt = async (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    decoded.admin = decoded.admin === "true";
    decoded.coordinator = decoded.coordinator === "true";

    return { valid: true, decoded };
  } catch (e) {
    return { valid: false, decoded: null };
  }
};

module.exports = verifyJwt;
