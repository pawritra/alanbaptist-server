const fp = require('fastify-plugin');
const fastifyAuth = require('@fastify/auth');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

module.exports = fp((app, _, next) => {
  app.decorate('verify', async (req, reply, done) => {
    try {
      const token = req.headers.authorization;
      if (token === null) {
        throw new Error('Not Authorized');
      } else {
        const parsedToken = jwt.decode(token);
        const user = await User.findOne({ username: parsedToken.username });
        if (!user) {
          throw new Error('User not found');
        }
      }
    } catch (err) {
      done(new Error('Not Authorized'));
    }

  }).register(fastifyAuth);

  next();
})
