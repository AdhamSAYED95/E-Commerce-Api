const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const Brand = require("../models/Brand");
const factory = require("./handlersReuse");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;

  next();
});

exports.getBrands = factory.getAllResources(Brand);

exports.getOneBrand = factory.getOneResource(Brand);

exports.createBrands = factory.createResource(Brand);

exports.updateBrand = factory.updateResource(Brand);

exports.deleteBrand = factory.deleteResource(Brand);
