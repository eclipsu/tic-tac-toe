const express = require("express");
const router = express.Router();
const { generateUUID } = require("../controlers/uuid");

router.get("/createid", generateUUID);

module.exports = router;
