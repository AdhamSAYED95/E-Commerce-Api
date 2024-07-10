const asyncHandler = require("express-async-handler");

const factory = require("./handlersReuse");
const Review = require("../models/Review");

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

exports.getReviews = factory.getAllResources(Review);

exports.getOneReview = factory.getOneResource(Review);

exports.createReviews = factory.createResource(Review);

exports.updateReview = factory.updateResource(Review);

exports.deleteReview = factory.deleteResource(Review);
