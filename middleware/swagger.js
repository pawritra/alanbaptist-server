const withSwagger = (fastify) => {
  fastify.register(require("@fastify/swagger"), {
    routePrefix: "/api/v1/documentation",
    swagger: {
      info: {
        title: "Alan Baptist Fitness Portfolio Backend",
        description: "Backend for a portfolio website",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      // host: "localhost:8081",
      host: "itchy-blue-seagull.cyclic.app/",
      schemes: ["https", "http"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "authorization",
          in: "header",
        },
      },
    },
    exposeRoute: true,
  });
};

module.exports = withSwagger;
