const S = require("fluent-json-schema");

const CouponRequest = S.object()
  .prop("code", S.string())
  .prop("discount", S.number());

const Coupon = S.object()
  .prop("code", S.string())
  .prop("discount", S.number())
  .prop("_id", S.string());

const getCouponSchema = {
  tags: ["Coupon"],
  summary: "Get Coupons",
};

const addCouponSchema = {
  tags: ["Coupon"],
  summary: "Add or Update Coupon",
  body: CouponRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const deleteCouponSchema = {
  tags: ["Coupon"],
  summary: "Delete Coupon",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  addCouponSchema,
  deleteCouponSchema,
  getCouponSchema
}