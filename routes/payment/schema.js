const S = require("fluent-json-schema");

const applyCouponSchema = {
  tags: ["Payment"],
  summary: "Apply Coupon",
  body: S.object()
    .prop("offerIds", S.array().items(S.string()))
    .prop("couponCode", S.string()),
};

const paymentSchema = {
  tags: ["Payment"],
  summary: "Perform Payment",
  body: S.object()
    .prop("offerIds", S.array().items(S.string()))
    .prop("couponCode", S.string())
    .prop("name", S.string())
    .prop("phone", S.number())
    .prop("email", S.string())
    .prop("type", S.string()),
};

const verifySchema = {
  tags: ["Payment"],
  summary: "Verify Payment",
  body: S.object()
    .prop("razorpay_order_id", S.string())
    .prop("razorpay_signature", S.string())
    .prop("razorpay_payment_id", S.string())
    .prop("receipt_id", S.string())
    .prop("type", S.string()),
};

module.exports = {
  paymentSchema,
  applyCouponSchema,
  verifySchema,
};
