const controller = require('./controller');
const schema = require("./schema");

module.exports = async (app, _, next) => {
  app.get(
    "/coupon",
    { schema: schema.getCouponSchema },
    controller.getCouponHandler
  );

  app.post(
    "/coupon/:id",
    { schema: schema.addCouponSchema, preHandler: app.auth([app.verify]) },
    controller.addCouponHandler
  );

  app.delete(
    "/coupon/:id",
    { schema: schema.deleteCouponSchema, preHandler: app.auth([app.verify]) },
    controller.deleteCouponHandler
  );

  next();
}