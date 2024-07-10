const subCategory = require("../models/subCategory");
const factory = require("./handlersReuse");

exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

exports.createsubCategory = factory.createResource(subCategory);

exports.getSubCategories = factory.getAllResources(subCategory);

exports.getOneSubCategory = factory.getOneResource(subCategory);

exports.updateSubCategory = factory.updateResource(subCategory);

exports.deleteCategory = factory.deleteResource(subCategory);
