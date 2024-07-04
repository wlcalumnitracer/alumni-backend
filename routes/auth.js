const { Router } = require("express");
const controller = require("../controller/auth.js");

const router = Router();

router.post("/signup", controller.Signup);

module.exports = router;
