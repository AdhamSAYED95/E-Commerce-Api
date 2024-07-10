const express = require("express");
const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");
const {
  getReviews,
  getOneReview,
  createReviews,
  updateReview,
  deleteReview,
  createFilterObject,
  setProductIdAndUserIdToBody,
} = require("../services/reviewService");

const { protect, allowedTo } = require("../services/authService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObject, getReviews)
  .post(
    protect,
    allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReviews
  );
router
  .route("/:id")
  .get(getReviewValidator, getOneReview)
  .put(protect, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowedTo("user", "admin", "user"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
