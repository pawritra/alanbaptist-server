const jwt = require("jsonwebtoken");
const schema = require("./schema");
const controller = require('./controller');

module.exports = (fastify, _, done) => {
  // Transactions
  fastify.get(
    "/",
    { schema: schema.getTransactions, preHandler: fastify.auth([fastify.verify]) },
    controller.getTransactions
  );

  fastify.get(
    "/:id",
    { schema: schema.getTransaction, preHandler: fastify.auth([fastify.verify]) },
    controller.getTransactions
  );

  fastify.post(
    "/",
    { schema: schema.addTransaction, preHandler: fastify.auth([fastify.verify]) },
    controller.createTransaction
  );

  fastify.patch(
    "/:id",
    { schema: schema.updateTransaction, preHandler: fastify.auth([fastify.verify]) },
    controller.updateTransaction
  );

  fastify.delete(
    "/:id",
    { schema: schema.deleteTransaction, preHandler: fastify.auth([fastify.verify]) },
    controller.deleteTransaction
  );

  done();
};
