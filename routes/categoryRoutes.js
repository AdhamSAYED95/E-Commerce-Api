const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  uploadCategoryImage,
  getCategories,
  createCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  resizeImage,
} = require("../services/categoryService");

const { protect, allowedTo } = require("../services/authService");

const subcategoriesRoute = require("./subCategoryRoutes");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadCategoryImage,
    createCategoryValidator,
    resizeImage,
    createCategories
  );
router
  .route("/:id")
  .get(getCategoryValidator, getOneCategory)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(protect, allowedTo("admin"), deleteCategoryValidator, deleteCategory);

module.exports = router;
