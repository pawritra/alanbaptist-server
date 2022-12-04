const controller = require('./controller')
const schema = require('./schema')

module.exports = (app, _, next) => {
  app.post(
    "/offer/:serviceId",
    { schema: schema.addOfferSchema, preHandler: app.auth([app.verify]) },
    controller.addOfferHandler
  );
  app.patch(
    "/offer/:id",
    { schema: schema.updateOfferSchema, preHandler: app.auth([app.verify]) },
    controller.updateOfferHandler
  );

  app.delete(
    "/offer/:id",
    { schema: schema.deleteOfferSchema, preHandler: app.auth([app.verify]) },
    controller.deleteOfferHandler
  );

  next();
}