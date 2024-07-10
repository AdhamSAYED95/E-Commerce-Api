const express = require("express");

const { protect, allowedTo } = require("../services/authService");

const {
  addProductsToWishlist,
  removeProductsFromWishlist,
  getLoggedUserWishList,
} = require("../services/wishListService");

const router = express.Router();

router.use(protect, allowedTo("user"));

router.post("/", addProductsToWishlist);

router.delete("/:productId", removeProductsFromWishlist);

router.get("/", getLoggedUserWishList);

module.exports = router;
