const { ProgramReach } = require('../../models/program_reach');

const getProgramReach = async (req, reply) => {
  try{
    const preach= await ProgramReach.findOne({ _id: req.params.id })
    return preach;
  } catch(err){
    reply.status(401).send(err);
  }
}

const getProgramReaches = async (req, reply) => {
  try {
    let messages = [];
    const defaultLimit = 10;
    const defaultIndex = 0;

    const limit = req.query.limit ? req.query.limit : defaultLimit;
    let index = req.query.index ? req.query.index : defaultIndex;
    let startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    let endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    if(startDate && endDate){
      messages = await ProgramReach.find({ createdAt: { $gte: startDate, $lte: endDate }}).skip(index).limit(limit)
    } else if(startDate){
      messages = await ProgramReach.find({ createdAt: { $gte: startDate }}).skip(index).limit(limit)
    } else if(endDate){
      messages = await ProgramReach.find({ createdAt: { $lte: endDate }}).skip(index).limit(limit)
    } else {
      messages = await ProgramReach.find().skip(index).limit(limit)
    }

    return messages
  } catch (err) {
    reply.status(401).send({ error: err.message })
  }
}

const addProgramReach = async (req, reply) => {
  try{
    const preach = new ProgramReach({ ...req.body })
    await preach.save();
    return { message: "Program Reach Created!" }
  } catch(err){
    reply.status(401).send(err);
  }
}

const deleteProgramReach = async (req, reply) => {
  try{
    await ProgramReach.findByIdAndDelete(req.params.id);
    return { message: "Program Reach Deleted" }
  } catch(err){
    reply.status(401).send(err);
  }
}

module.exports = {
  getProgramReach,
  getProgramReaches,
  addProgramReach,
  deleteProgramReach
}
