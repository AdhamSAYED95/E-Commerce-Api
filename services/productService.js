const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const Product = require("../models/Product");

//// GET All of products
//// GET /api/v1/categories

exports.getProducts = asyncHandler(async (req, res) => {
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 5;
  // const skip = (page - 1) * limit;
  const products = await Product.find({}).populate({
    path: "category",
    select: "name -_id",
  });
  // .skip(skip)
  // .limit(limit);
  res.status(200).json({ results: products.length, data: products });
});

////  Get specific product bt id
////  GET /api/v1/categories
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(new ApiError(`No product was Found for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//// Create category
////  POST /api/v1/categories
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ result: product });
});

//// Update specific category
////  Put /api/v1/categories
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product was Found for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

////
////
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product was Found for this id ${id}`, 404));
  }
  res.status(204).send();
});
