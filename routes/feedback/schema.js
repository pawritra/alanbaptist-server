const S = require("fluent-json-schema");

const MessageRequest = S.object()
  .prop("name", S.string())
  .prop("message", S.string())
  .prop("email", S.string())
  .prop("phone", S.string());


const getMessageSchema = {
  tags: ["Feedback"],
  summary: "Get Messages",
};

const getMessagesSchema = {
  tags: ["Feedback"],
  summary: "Get Messages",
  querystring: S.object()
    .prop("index", S.number())
    .prop("limit", S.number())
    .prop("startDate", S.string())
    .prop("endDate", S.string())
};

const addMessageSchema = {
  tags: ["Feedback"],
  summary: "Add or Update Message",
  body: MessageRequest,
};

const deleteMessageSchema = {
  tags: ["Feedback"],
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
