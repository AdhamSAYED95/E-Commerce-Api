const express = require("express");

const {
  createCashOrder,
  getAllOrders,
  filterOrderForLoggedUser,
  getSpecificOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkOutSession,
} = require("../services/orderService");

const { protect, allowedTo } = require("../services/authService");

const router = express.Router();

router.use(protect);

router.route("/checkout-session/:cartId").post(checkOutSession);

router.route("/:cartId").post(allowedTo("user"), createCashOrder);
router
  .route("/")
  .get(
    allowedTo("user", "admin", "manager"),
    filterOrderForLoggedUser,
    getAllOrders
  );

router.route("/:id").get(getSpecificOrders);

router.route("/:id/pay").put(allowedTo("admin", "manager"), updateOrderToPaid);

router
  .route("/:id/deliver")
  .put(allowedTo("admin", "manager"), updateOrderToDelivered);

module.exports = router;
