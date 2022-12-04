const schema = require("./schema");
const controller = require('./controller')

module.exports = (fastify, opts, done) => {
  fastify.post(
    "/api/v1/auth/login",
    { schema: schema.loginSchema },
    controller.loginHandler
  );

  fastify.post(
    "/api/v1/auth/register",
    { schema: schema.loginSchema },
    controller.loginHandler
  );

  fastify.patch(
    "/api/v1/auth/update",
    { schema: schema.updateSchema },
    controller.updateAuth
  );
  done();
};
