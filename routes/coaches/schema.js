const S = require("fluent-json-schema");

const EmployeeRequest = S.object()
  .prop("name", S.string())
  .prop("email", S.string())
  .prop("role", S.string())
  .prop("phone", S.string())
  .prop("image", S.string())
  .prop("description", S.string());


const getEmployeeSchema = {
  tags: ["Employee"],
  summary: "Get Employees",
};

const getEmployeesSchema = {
  tags: ["Employee"],
  summary: "Get Employees",
  querystring: S.object()
    .prop("index", S.number())
    .prop("limit", S.number())
};

const addEmployeeSchema = {
  tags: ["Employee"],
  summary: "Add Employee",
  body: EmployeeRequest,
  security: [
    {
      apiKey: [],
    },
  ],
};

const updateEmployeeSchema = {
  tags: ["Employee"],
  summary: "Update Employee",
  body: EmployeeRequest,
  security: [
    {
      apiKey: [],
    },
  ],
}

const deleteEmployeeSchema = {
  tags: ["Employee"],
  summary: "Delete Employee",
  params: S.object().prop("id", S.string()),
  security: [
    {
      apiKey: [],
    },
  ],
};

module.exports = {
  getEmployeesSchema,
  addEmployeeSchema,
  deleteEmployeeSchema,
  getEmployeeSchema,
  updateEmployeeSchema
}
