const { check, body } = require("express-validator");
const validationMiddleWare = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id"),
  validationMiddleWare,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to category")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),

  validationMiddleWare,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validationMiddleWare,
];

exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id for the subCategory required")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validationMiddleWare,
];
