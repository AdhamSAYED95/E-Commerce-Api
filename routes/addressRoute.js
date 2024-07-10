const express = require("express");

const { protect, allowedTo } = require("../services/authService");

const {
  addAddresses,
  removeAddress,
  getLoggedUserAddress,
} = require("../services/addressesService");

const router = express.Router();

router.use(protect, allowedTo("user"));

router.post("/", addAddresses);

router.delete("/:addressId", removeAddress);

router.get("/", getLoggedUserAddress);

module.exports = router;
