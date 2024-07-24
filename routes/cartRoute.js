const express = require("express");

const {
  addProductsToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCouponToCart,
} = require("../services/cartService");

const { protect, allowedTo } = require("../services/authService");

const router = express.Router();

router.use(protect, allowedTo("user"));

router
  .route("/")
  .post(addProductsToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.put("/applyCoupon", applyCouponToCart);

router
  .route("/:cartItemId")
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;
