const { check } = require("express-validator");
const validationMiddleWare = require("../../middlewares/validatorMiddleware");
const Review = require("../../models/Review");

exports.createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5"),
  check("user").isMongoId().withMessage("Invalid Review id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (review) {
            return Promise.reject(
              new Error("You already created a review before")
            );
          }
        }
      )
    ),
  validationMiddleWare,
];

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id"),
  validationMiddleWare,
];

exports.updateReviewValidator = [
  check("id")
    .optional()
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error("Review not found"));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error("Unauthorized to update this review")
          );
        }
      })
    ),
  validationMiddleWare,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) => {
      if (req.user.role === "user") {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(new Error("Review not found"));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("Unauthorized to update this review")
            );
          }
        });
      }
      return true;
    }),
  validationMiddleWare,
];
