const crypto = require("crypto");

const generateUUID = async (req, res) => {
  const id = crypto.randomBytes(16).toString("hex");
  return res.status(200).json({ uuid: id });
};

module.exports = { generateUUID };
