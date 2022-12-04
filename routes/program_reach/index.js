
const controller = require('./controller')
const schema = require("./schema")

module.exports = (app, _, next) => {

  app.get('/', { schema: schema.getProgramReachesSchema } ,controller.getProgramReaches)
  app.get('/:id', { schema: schema.getProgramReachSchema } , controller.getProgramReach)
  app.post('/', { schema: schema.addProgramReachSchema }, controller.addProgramReach)
  app.delete('/:id', { schema: schema.deleteProgramReachSchema, preHandler: app.auth([app.verify]) }, controller.deleteProgramReach)

  next();
}
