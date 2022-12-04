const controller = require('./controller')
const schema = require("./schema")

module.exports = (app, _, next) => {

  app.get('/', { schema: schema.getMessagesSchema } ,controller.getMessages)
  app.get('/:id', { schema: schema.getMessageSchema }, controller.getMessage)
  app.post('/', { schema: schema.addMessageSchema }, controller.createMessage)
  app.delete('/:id', { schema: schema.deleteMessageSchema, preHandler: app.auth([app.verify]) }, controller.deleteMessage)

  next();
}
