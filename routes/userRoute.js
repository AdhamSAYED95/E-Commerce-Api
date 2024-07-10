const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidator");
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggeedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  DeactivateLoggedUser,
  ActivateLoggedUser,
} = require("../services/userService");

const {
  protect,
  allowedTo,
  verifyTokenforDeactivatedUsers,
} = require("../services/authService");

const router = express.Router();

router.put("/activateMe", verifyTokenforDeactivatedUsers, ActivateLoggedUser);

router.use(protect);

router.get("/getMe", getLoggeedUserData, getOneUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deactivateMe", DeactivateLoggedUser);

router.use(allowedTo("admin"));

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getOneUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
