const mongoose = require("mongoose");
const withSwagger = require("./middleware/swagger");
const withAuth = require('./middleware/withAuth');
const fastify = require("fastify")({ logger: true });

require("dotenv").config();

// Importing Routes
const addBlogRoutes = require("./routes/blogs");
const addServiceRoutes = require("./routes/services");
const addOfferRoutes = require("./routes/offer");
const addCouponRoutes = require("./routes/coupon");
const addMessageRoutes = require("./routes/messages");
const addPaymentRoutes = require("./routes/payment");
const addAuthRoutes = require("./routes/auth");
const addTransactionRoutes = require("./routes/transactions");
const addFeedbackRoutes = require("./routes/feedback");
const addEmployeeRoutes = require('./routes/coaches')
const addProgramReachRoutes = require('./routes/program_reach');

// Run the server!
const start = async () => {
  try {
    // Connecting to server
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to Database");

    fastify.register(require("@fastify/cors"), {});
    await fastify.register(import('@fastify/compress'), { global: false })
    withSwagger(fastify);
    fastify.register(withAuth);


    fastify.register(addBlogRoutes, { prefix: "/api/v1/blogs" });
    fastify.register(addOfferRoutes, { prefix: "/api/v1/admin" });
    fastify.register(addCouponRoutes, { prefix: "/api/v1/admin" });
    fastify.register(addServiceRoutes, { prefix: "/api/v1/admin" });
    fastify.register(addPaymentRoutes, { prefix: "/api/v1/payment" });
    fastify.register(addTransactionRoutes, { prefix: "/api/v1/transaction" });
    fastify.register(addAuthRoutes, { prefix: "/api/v1/auth" });
    fastify.register(addMessageRoutes, { prefix: "/api/v1/messages" });
    fastify.register(addFeedbackRoutes, { prefix: "/api/v1/feedbacks" });
    fastify.register(addEmployeeRoutes, { prefix: "/api/v1/employees" });
    fastify.register(addProgramReachRoutes, { prefix: "/api/v1/program_reaches" });

    //fastify.listen({ port: process.env.PORT, host: "0.0.0.0" });
    fastify.listen({ port: '8081', host: "localhost" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
