const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
const {
  getBrands,
  createBrands,
  getOneBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrands);
router
  .route("/:id")
  .get(getBrandValidator, getOneBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
