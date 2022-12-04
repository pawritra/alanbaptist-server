const S = require("fluent-json-schema");

const TransactionSchemaRequest = S.object()
  .prop("_id", S.string())
  .prop("couponCode", S.string())
  .prop("name", S.string())
  .prop("status", S.string())
  .prop("amount", S.string())
  .prop("phone", S.string())
  .prop("email", S.string())
  .prop("date", S.string())
  .prop("offers", S.array().items(S.string()))
  .prop("type", S.string())
  .prop("razorpay_order_id", S.string())
  .prop("razorpay_signature", S.string())
  .prop("razorpay_payment_id", S.string());

const getTransactions = {
  tags: ["Transactions"],
  summary: "Get Transactions",
  querystring: S.object().prop("status", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const getTransaction = {
  tags: ["Transactions"],
  summary: "Get One Transaction",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const deleteTransaction = {
  tags: ["Transactions"],
  summary: "Delete Transactions",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

const updateTransaction = {
  tags: ["Transactions"],
  summary: "Update Transactions",
  params: S.object().prop("id", S.string()),
  body: TransactionSchemaRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const addTransaction = {
  tags: ["Transactions"],
  summary: "Add Transaction",
  body: TransactionSchemaRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  getTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  addTransaction,
};
