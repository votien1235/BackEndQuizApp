const express = require("express");
const authRouter = require("./auth")
const router = express.Router();
const uploadRouter = require("./upload");

router.use("/auth", authRouter);
router.use("/upload", uploadRouter);

module.exports = router;