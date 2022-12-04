const User = require("../../models/user").User;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const updateAuth = async (request, reply) => {
  try {
    // Checking Authorization
    if (!request.headers.authorization) {
      reply.status(500).send({ error: "Auth Token not Found" });
      done();
    }

    token = request.headers.authorization;

    const payload = jwt.verify(token, process.env.SECRET);
    if (!payload) {
      reply.status(500).send({ error: "Not authorized" });
    }

    // Updating User
    const { username, password } = request.body;
    const checkUser = User.findOne({ username: username });
    if (!checkUser) {
      reply.status(500).send({ error: "User does not exist" });
    }

    var hashedPassword = crypto
      .createHmac("sha256", process.env.RZP_SECRET)
      .update(password)
      .digest("hex");

    await User.findOneAndUpdate(
      { username: username },
      { password: hashedPassword }
    );

    return { message: "Admin Updated" };
  } catch (err) {
    reply.status(400).send({ error: err.message });
    return;
  }
};

const loginHandler = async (request, reply) => {
  try {
    const { username, password } = request.body;
    const checkUser = await User.findOne({ username: username });
    if (!checkUser) {
      reply.status(500).send({ error: "User does not exist" });
      return;
    }

    var hashedPassword = crypto
      .createHmac("sha256", process.env.RZP_SECRET)
      .update(password)
      .digest("hex");

    if (hashedPassword == checkUser.password) {
      const payload = {
        username: username,
        role: "admin",
      };

      const jwt_token = jwt.sign(payload, process.env.SECRET);
      reply.status(200).send({ token: jwt_token, message: "User logged in." });
    } else {
      reply.status(500).send({ error: "Wrong Credentials" });
      return;
    }
  } catch (err) {
    reply.status(400).send({ error: err.message });
    return;
  }
};

const registerHandler = async (request, reply) => {
  try {
    const { username, password } = request.body;
    const checkUser = await User.findOne({ username: username });
    if (checkUser) {
      reply.status(500).send({ error: "Username already exists" });
    }

    var hashedPassword = crypto
      .createHmac("sha256", process.env.RZP_SECRET)
      .update(password)
      .digest("hex");

    const newUser = User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
    return { message: "Admin Created" };
  } catch (err) {
    reply.status(400).send({ error: err.message });
    return;
  }
};

module.exports = {
  updateAuth,
  loginHandler,
  registerHandler
}