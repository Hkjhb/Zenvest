const crypto = require("crypto");

const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => {
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, passwordHash };
};

const verifyPassword = (password, salt, passwordHash) => {
  const hashedAttempt = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hashedAttempt === passwordHash;
};

const generateAuthToken = () => crypto.randomBytes(32).toString("hex");

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice(7);
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateAuthToken,
  getBearerToken,
};
