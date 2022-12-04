const Receipt = require("../../models/order").Receipt;

const createTransaction = async (req, reply) => {
  try {
    const receipt = new Receipt({ ...req.body });
    await receipt.save();
    reply.status(200).send({ message: "Transaction has been added." });
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Some error occured" });
  }
};

const deleteTransaction = async (req, reply) => {
  try {
    const { id } = req.params;
    await Receipt.findByIdAndRemove(id);
    reply.status(200).send({ message: "Transaction has been deleted." });
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Some error occured" });
  }
};

const getTransaction = async (req, reply) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findById(id).populate("offers");

    console.log(receipt);
    reply.status(200).send(receipt);
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Some error occured" });
  }
};

const getTransactions = async (req, reply) => {
  try {
    const { status } = req.query;
    let receipts = [];
    if (status) {
      receipts = await Receipt.find({ status: status }).populate("offers");
    } else {
      receipts = await Receipt.find().populate("offers");
    }

    reply.status(200).send(receipts);
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Some error occured" });
  }
};

const updateTransaction = async (req, reply) => {
  try {
    const { id } = req.params;
    await Receipt.findByIdAndUpdate(id, { ...req.body });
    reply.status(200).send({ message: "Transaction has been Update." });
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: "Some error occured" });
  }
};

module.exports = {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction
}
