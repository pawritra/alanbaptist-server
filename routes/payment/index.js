const schema = require("./schema");
const controller = require('./controller');

module.exports = (fastify, opts, done) => {
  fastify.post(
    "/generateReceipt",
    { schema: schema.paymentSchema },
    controller.generatePayment
  );
  fastify.post(
    "/verifyPayment",
    { schema: schema.verifySchema },
    controller.verifyPayment
  );

  fastify.post(
    "/applyCoupon",
    { schema: schema.applyCouponSchema },
    controller.applyCoupon
  );
  done();
};
