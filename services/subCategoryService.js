const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const subCategory = require("../models/subCategory");

exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createsubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const SubCategory = await subCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ result: SubCategory });
});

exports.createFilterObject = (req, res, next) => {
  let filterObjet = {};
  if (req.params.categoryId) filterObjet = { category: req.params.categoryId };
  req.filterObjet = filterObjet;
  next();
};

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategory
    .find(req.filterObjet)
    .skip(skip)
    .limit(limit);
  // .populate({ path: "category", select: "name -_id" });

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

////  Get specific category bt id
////  GET /api/v1/categories
exports.getOneSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const SubCategory = await subCategory
    .findById(id)
    .populate({ path: "category", select: "name -_id" });
  if (!SubCategory) {
    return next(
      new ApiError(`No subcategory was Found for this id ${id}`, 404)
    );
  }
  res.status(200).json({ data: SubCategory });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const SubCategory = await subCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true },
    {}
  );
  if (!SubCategory) {
    return next(
      new ApiError(`No SubCategory was Found for this id ${id}`, 404)
    );
  }
  res.status(200).json({ data: SubCategory });
});

////
////
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const SubCategory = await subCategory.findByIdAndDelete(id);
  if (!SubCategory) {
    return next(
      new ApiError(`No SubCategory was Found for this id ${id}`, 404)
    );
  }
  res.status(204).send();
});
