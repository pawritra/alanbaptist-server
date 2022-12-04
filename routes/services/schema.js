const S = require("fluent-json-schema");

const OfferRequest = S.object()
  .prop("currency", S.string())
  .prop("price", S.number())
  .prop("discounted_price", S.number())
  .prop("duration", S.string())
  .prop("offer_name", S.string())
  .prop("recommended", S.boolean())
  .prop("in_stock", S.boolean())
  .prop("features", S.array().items(S.string()))
  .prop("feature_images", S.array().items(S.string()));

const ServiceRequest = S.object()
  .prop("service", S.string())
  .prop("service_image", S.array().items(S.string()))
  .prop("description", S.string())
  .prop("sequence", S.number())
  .prop("level", S.number())
  .prop(
    "subservices",
    S.array()
      .items(
        S.object()
          .prop("service", S.string())
          .prop("service_image", S.array().items(S.string()))
          .prop("description", S.string())
      )
      .raw({ nullable: true })
  )
  .prop("offers", S.array().items(OfferRequest).raw({ nullable: true }));

const addServiceSchema = {
  tags: ["Service"],
  summary: "Add New Service",
  body: ServiceRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const getServiceSchema = {
  tags: ["Service"],
  summary: "Get Service",
  params: S.object().prop("service", S.string()),
};

const getServicesSchema = {
  tags: ["Service"],
  summary: "Get Services based on Level",
  querystring: S.object().prop("level", S.number()),
};

const updateServiceNameSchema = {
  tags: ["Service"],
  summary: "Update Service Name",
  querystring: S.object().prop("level", S.number()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const updateServiceSchema = {
  tags: ["Service"],
  summary: "Update Service",
  params: S.object().prop("serviceId", S.string()),
  body: ServiceRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const deleteServiceSchema = {
  tags: ["Service"],
  summary: "Delete Service",
  params: S.object().prop("serviceId", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  getServiceSchema,
  getServicesSchema,
  addServiceSchema,
  updateServiceNameSchema,
  updateServiceSchema,
  deleteServiceSchema
};
