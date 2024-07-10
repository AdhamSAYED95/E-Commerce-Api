const express = require("express");
const {
  signUpValidator,
  logInValidator,
} = require("../utils/validators/authValidator");
const {
  signUp,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/authService");

const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/login", logInValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyPassResetCode", verifyPassResetCode);
router.put("/resetPassword", resetPassword);

module.exports = router;
