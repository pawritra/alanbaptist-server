const { Feedback } = require('../../models/feedback')

const getMessage = async (req, reply) => {
  try {
    const message = await Feedback.findOne({ _id: req.params.id })
    return message;
  } catch (err) {
    reply.status(401).send({ error: err.message })
  }
}

const getMessages = async (req, reply) => {
  try {
    let messages = [];
    const defaultLimit = 10;
    const defaultIndex = 0;

    const limit = req.query.limit ? req.query.limit : defaultLimit;
    let index = req.query.index ? req.query.index : defaultIndex;
    let startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    let endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    if(startDate && endDate){
      messages = await Feedback.find({ createdAt: { $gte: startDate, $lte: endDate }}).skip(index).limit(limit)
    } else if(startDate){
      messages = await Feedback.find({ createdAt: { $gte: startDate }}).skip(index).limit(limit)
    } else if(endDate){
      messages = await Feedback.find({ createdAt: { $lte: endDate }}).skip(index).limit(limit)
    } else {
      messages = await Feedback.find().skip(index).limit(limit)
    }

    return messages
  } catch (err) {
    reply.status(401).send({ error: err.message })
  }
}

const createMessage = async (req, reply) => {
  try {
    const message = new Feedback({ ...req.body })
    await message.save();
    return { message: "Feedback Created!" }
  } catch (err) {
    reply.status(401).send({ error: err.message })
  }
}

const deleteMessage = async (req, reply) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    return { message: "Feedback Deleted" }
  } catch (err) {
    reply.status(400).send({ error: "Some error occured." });
  }
}

module.exports = {
  getMessage,
  getMessages,
  createMessage,
  deleteMessage,
}
