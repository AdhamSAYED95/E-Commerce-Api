const express = require("express");

const {
  addProductsToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
} = require("../services/cartService");

const { protect, allowedTo } = require("../services/authService");

const router = express.Router();

router.use(protect, allowedTo("user"));

router.route("/").post(addProductsToCart).get(getLoggedUserCart);

router.route("/:cartItemId").delete(removeSpecificCartItem);

module.exports = router;
