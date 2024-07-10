const Coupon = require("../models/Coupon");
const factory = require("./handlersReuse");

exports.getCoupons = factory.getAllResources(Coupon);

exports.getOneCoupon = factory.getOneResource(Coupon);

exports.createCoupons = factory.createResource(Coupon);

exports.updateCoupon = factory.updateResource(Coupon);

exports.deleteCoupon = factory.deleteResource(Coupon);
