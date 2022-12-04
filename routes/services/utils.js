const Service = require("../../models/service").Service;
const Offer = require("../../models/offer").Offer;

const deleteService = async (serviceId) => {
  const service = await Service.findById(serviceId);

  if (!service) return;
  for (let i = 0; i < service.offers.length; i++) {
    await Offer.findByIdAndDelete(service.offers[i]);
  }

  for (let i = 0; i < service.subservices.length; i++) {
    await deleteService(service.subservices[i]);
  }

  await Service.findByIdAndDelete(serviceId);
};

const serviceNameChangeHandler = async (serviceId, oldName, newName) => {
  const service = await Service.findById(serviceId);

  if (service && service.subservices && service.subservices.length > 0) {
    await service.subservices.forEach(async (subserviceId) => {
      await serviceNameChangeHandler(subserviceId, oldName, newName);
    });
  } else {
    if (service && service.offers && service.offers.length > 0) {
      await service.offers.forEach(async (offerId) => {
        const offer = await Offer.findById(offerId);
        if (offer != null) {
          const offerName = offer.offer_name;
          const newOfferName = offerName.replace(oldName, newName);
          await Offer.findByIdAndUpdate(offerId, { offer_name: newOfferName });
        }
      });
    }
  }
};

const removeUnusedOffers = async (service) => {
  try {
    for (let i = 0; i < service.offers.length; i++) {
      const offer = await Order.findById(service.offers[i]);
      if (offer == null) {
        await Service.updateOne({ _id: service._id }, { $pull: { offers: offer } });
      }
    }
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  removeUnusedOffers,
  deleteService,
  serviceNameChangeHandler
}