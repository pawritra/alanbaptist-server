const schema = require("./schema");
const controller = require('./controller');

module.exports = (fastify, _, done) => {
  // Services
  fastify.get("/service/:service", { schema: schema.getServiceSchema, }, controller.getServiceHandler);
  fastify.get("/service", { schema: schema.getServicesSchema }, controller.getServicesHandler);
  fastify.get("/end_services", { schema: schema.getServicesSchema }, controller.getEndServicesHandler);
  fastify.patch("/service/:serviceId", { schema: schema.updateServiceSchema, preHandler: fastify.auth([fastify.verify]) }, controller.updateServiceHandler);
  fastify.delete("/service/:serviceId", { schema: schema.deleteServiceSchema, preHandler: fastify.auth([fastify.verify]) }, controller.deleteServiceHandler);
  fastify.post("/service", { schema: schema.addServiceSchema, preHandler: fastify.auth([fastify.verify]) }, controller.addServiceHandler);

  done();
};
