const { Offer } = require("../../models/offer");
const { Service } = require("../../models/service");

const addOfferHandler = async (req, reply) => {
  try {
    const { serviceId } = req.params;
    const offer = Offer({ ...req.body });
    await offer.save();
    console.log(serviceId)
    await Service.findByIdAndUpdate(serviceId, {
      $push: { offers: offer["_id"].toString() },
    });

    reply.status(200).send(offer);
  } catch (err) {
    console.log(err)
    reply.status(400).send({ error: "Error Creating Offer" });
  }
};

const deleteOfferHandler = async (req, reply) => {
  try {
    const { id } = req.params;

    await Service.updateOne({ offers: id }, { $pull: { offers: id } });
    await Offer.findOneAndRemove(id);

    reply.status(200).send({ message: `Offer Deleted` });
  } catch (err) {
    console.log(err)
    reply.status(400).send({ error: "Error Deleting Offer" });
  }
};


const updateOfferHandler = async (req, reply) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findByIdAndUpdate(id, { ...req.body });

    reply.status(200).send(offer);
  } catch (err) {
    reply.status(400).send({ error: "Offer does not exist" });
  }
};

module.exports = {
  addOfferHandler,
  updateOfferHandler,
  deleteOfferHandler
}