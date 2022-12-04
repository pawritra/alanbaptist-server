const controller = require('./controller')
const schema = require("./schema")

module.exports = (app, _, next) => {
  app.get('/', { schema: schema.getEmployeesSchema }, controller.getCoaches)
  app.get('/:id', { schema: schema.getEmployeeSchema }, controller.getCoach)
  app.patch('/:id', { schema: schema.updateEmployeeSchema, preHandler: app.auth([app.verify]) }, controller.updateCoach)
  app.post('/', { schema: schema.addEmployeeSchema, preHandler: app.auth([app.verify]) }, controller.addCoach)
  app.delete('/:id', { schema: schema.deleteEmployeeSchema, preHandler: app.auth([app.verify]) }, controller.deleteCoach)

  next();
}
