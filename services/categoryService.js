const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");
const factory = require("./handlersReuse");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  req.body.image = filename;

  next();
});

// exports.checkCategoryExists = asyncHandler(async (req, res, next) => {
//   const { name } = req.body;
//   try {
//     const category = await Category.findOne({ name });
//     if (category) {
//       return res
//         .status(400)
//         .json({ message: `Category with name ${name} already exists.` });
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

exports.uploadCategoryImage = uploadSingleImage("image");

exports.getCategories = factory.getAllResources(Category);

exports.getOneCategory = factory.getOneResource(Category);

exports.createCategories = factory.createResource(Category);

exports.updateCategory = factory.updateResource(Category);

exports.deleteCategory = factory.deleteResource(Category);
