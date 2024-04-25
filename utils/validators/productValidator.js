const { check } = require("express-validator");
const validationMiddleWare = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/Category");
const subCategories = require("../../models/subCategory");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 3000 })
    .withMessage("Product description too long"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold").optional().isNumeric().withMessage("Product must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Product price too long"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error(
          "Product priceAfterDiscount cannot be greater than product price"
        );
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid category id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error("Invalid category id"));
        }
      })
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid sub category id format")
    .custom((subcategoriesIds) =>
      subCategories
        .find({ _id: { $exists: true, $in: subcategoriesIds } })
        .then((subCategoriesFound) => {
          if (
            subCategoriesFound.length < 1 ||
            subCategoriesFound.length !== subcategoriesIds.length
          ) {
            return Promise.reject(new Error("Invalid subcategory id"));
          }
        })
    )
    .custom((val, { req }) =>
      subCategories
        .find({ category: req.body.category })
        .then((subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subcategory) => {
            subCategoriesIdsInDB.push(subcategory._id);
          });
          console.log(subCategoriesIdsInDB);
        })
    ),
  check("Brand").optional().isMongoId().withMessage("Invalid brand id format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal to 1.0")
    .isLength({ max: 1 })
    .withMessage("Rating must be below or equal to 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validationMiddleWare,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid brand id"),
  validationMiddleWare,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validationMiddleWare,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validationMiddleWare,
];
