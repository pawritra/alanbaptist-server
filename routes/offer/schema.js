const S = require("fluent-json-schema");

const Offer = S.object()
  .prop("_id", S.string())
  .prop("currency", S.string())
  .prop("price", S.number())
  .prop("discounted_price", S.number())
  .prop("offer_name", S.string())
  .prop("duration", S.string())
  .prop("features", S.array().items(S.string()))
  .prop("recommended", S.boolean())
  .prop("in_stock", S.boolean())
  .prop("feature_images", S.array().items(S.string()));

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







const updateOfferSchema = {
  tags: ["Offer"],
  summary: "Update a Offer",
  params: S.object().prop("id", S.string()),
  body: OfferRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const addOfferSchema = {
  tags: ["Offer"],
  summary: "Create a Offer",
  body: OfferRequest,
  params: S.object().prop("serviceId", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const deleteOfferSchema = {
  tags: ["Offer"],
  summary: "Delete a Offer",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};



module.exports = {
  deleteOfferSchema,
  updateOfferSchema,
  addOfferSchema
};
