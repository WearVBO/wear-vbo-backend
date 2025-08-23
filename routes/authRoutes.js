const express = require("express");
const router = express.Router();
const { RegisterUser, LoginUser } = require("../controllers/authController");
const { SendNewsLetter } = require("../controllers/newsletterController");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/newsletter", SendNewsLetter);

module.exports = router;
