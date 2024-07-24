const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

exports.addProductsToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    const alreadyInCart = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (alreadyInCart > -1) {
      const cartItem = cart.cartItems[alreadyInCart];
      cartItem.quantity += 1;

      cart.cartItems[alreadyInCart] = cartItem;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("Cart not found for this user ", 404));
  }

  res.status(200).json({
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.cartItemId } } },
    { new: true }
  );

  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.clearCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(204).send();
});

exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found for this user ", 404));
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.cartItemId
  );

  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(new ApiError("Item not found in the cart", 404));
  }

  calcTotalCartPrice(cart);

  await cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.applyCouponToCart = asyncHandler(async (req, res, next) => {
  const { couponCode } = req.body;
  const coupon = await Coupon.findOne({
    name: couponCode,
    expires: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new ApiError("Coupon not found or expired", 404));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  const totalPrice = cart.totalCartPrice;

  const totalPriceAfterDiscount =
    totalPrice - (totalPrice * coupon.discount) / 100;

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;

  await cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
