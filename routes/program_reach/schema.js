
const S = require("fluent-json-schema");

const ProgramReachRequest = S.object()
  .prop("gender", S.string())
  .prop("age_group", S.string())
  .prop("height", S.string())
  .prop("weight", S.string())
  .prop("activity", S.string())
  .prop("goal", S.string())
  .prop("name", S.string())
  .prop("phone", S.string())
  .prop("email", S.string())
  .prop("message", S.string());


const getProgramReachSchema = {
  tags: ["Program Reach"],
  summary: "Get ProgramReachs",
};

const getProgramReachesSchema = {
  tags: ["Program Reach"],
  summary: "Get ProgramReachs",
  querystring: S.object()
    .prop("index", S.number())
    .prop("limit", S.number())
    .prop("startDate", S.string())
    .prop("endDate", S.string())
};

const addProgramReachSchema = {
  tags: ["Program Reach"],
  summary: "Add or Update ProgramReach",
  body: ProgramReachRequest,
};

const deleteProgramReachSchema = {
  tags: ["Program Reach"],
  summary: "Delete ProgramReach",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  getProgramReachesSchema,
  addProgramReachSchema,
  deleteProgramReachSchema,
  getProgramReachSchema
}
