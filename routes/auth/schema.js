const S = require("fluent-json-schema");

const loginSchema = {
  tags: ["Auth"],
  summary: "Admin Login/Register",
  body: S.object().prop("username", S.string()).prop("password", S.string()),
};

const updateSchema = {
  tags: ["Auth"],
  summary: "Password Update",
  body: S.object().prop("username", S.string()).prop("password", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};
module.exports = {
  loginSchema,
  updateSchema,
};
