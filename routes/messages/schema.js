const S = require("fluent-json-schema");

const MessageRequest = S.object()
  .prop("name", S.string())
  .prop("message", S.string())
  .prop("email", S.string())
  .prop("phone", S.string());


const getMessageSchema = {
  tags: ["Message"],
  summary: "Get Messages",
};

const getMessagesSchema = {
  tags: ["Message"],
  summary: "Get Messages",
  querystring: S.object()
    .prop("index", S.number())
    .prop("limit", S.number())
    .prop("startDate", S.string())
    .prop("endDate", S.string())
};

const addMessageSchema = {
  tags: ["Message"],
  summary: "Add or Update Message",
  body: MessageRequest,
};

const deleteMessageSchema = {
  tags: ["Message"],
  summary: "Delete Message",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  getMessagesSchema,
  addMessageSchema,
  deleteMessageSchema,
  getMessageSchema
}
