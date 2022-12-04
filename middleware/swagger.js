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
      host: "desolate-retreat-74146.herokuapp.com/",
      schemes: ["http", "https"],
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
