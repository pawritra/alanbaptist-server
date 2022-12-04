const Service = require("../../models/service").Service;
const Offer = require("../../models/offer").Offer;
const {
  removeUnusedOffers,
  deleteService,
  serviceNameChangeHandler
} = require('./utils')

const getEndServicesHandler = async (req, reply) => {
  try {
    const resService = await Service.find({ subservices: { $exists: true, $size: 0 } })
      .populate("offers")
      .populate("subservices")
      .sort({ sequence: 1 });

    reply.status(200).send(resService);
  } catch (err) {
    reply.status(404).send({ error: "Service not found" });
  }
};

const getServiceHandler = async (req, reply) => {
  try {
    const { service } = req.params;
    let resService;

    resService = await Service.findOne({ service: service }).populate("offers").populate({ path: "subservices", options: { sort: { sequence: 1 } } });
    if (!resService) {
      resService = await Service.findById(service)
        .populate("offers")
        .populate({ path: "subservices", options: { sort: { sequence: 1 } } });
    }

    if (!resService) {
      return reply.status(404).send({ error: "Service not found." })
    }

    reply.status(200).send(resService);
  } catch (err) {
    console.log(err)
    reply.status(404).send({ error: "Service not found" });
  }
};

const getServicesHandler = async (req, reply) => {
  const { level } = req.query;
  try {
    const resService = await Service.find({
      level: level,
    })
      .populate("offers")
      .populate("subservices")
      .sort({ sequence: 1 });

    reply.status(200).send(resService);
  } catch (err) {
    reply.status(404).send({ error: "Service not found" });
  }
};

const addServiceHandler = async (req, reply) => {
  try {
    let newService;
    let offerArr = [];
    let subservicesArr = [];
    const { service, subservices, offers, level = 0 } = req.body;

    const checkService = await Service.findOne({ service: service });
    if (checkService) {
      throw new Error(service + " Service already exists");
    }

    for (let i = 0; i < subservices.length; i++) {
      const serv = await Service.findOne({ service: subservices[i].service });
      if (serv) {
        throw new Error(subservices[i].service + " subservice already exists");
      }
    }


    const temp = await Service.findOne({ service: service });
    if (temp) {
      newService = temp;
      subservicesArr = temp.subservices;
      offerArr = temp.offers;
    } else {
      newService = new Service({
        service: service,
        level: level,
        service_image: req.body.service_image,
        description: req.body.description,
        sequence: req.body.sequence,
      });
    }

    if (level == 1 || level == 2) {
      if (newService.offers.length > 0) {
        reply.status(402).send({ error: "Already contains Offers" });
        return;
      }
    }

    if (level == 3) {
      if (newService.subservices.length > 0) {
        reply.status(402).send({ error: "Already contains Subservices" });
      }
    }

    if (offers && offers.length > 0) {
      offers.forEach((offer) => {
        const newOffer = new Offer({ ...offer });
        newOffer.save();

        offerArr.push(newOffer["_id"].toString());
      });
    } else {
      subservices.forEach((serv) => {
        const newSubServices = new Service({
          ...serv,
          level: parseInt(newService.level) + 1,
        });

        newSubServices.save();
        console.log("New Service Id ", newSubServices["_id"].toString());
        subservicesArr.push(newSubServices["_id"].toString());
      });
    }

    if (temp) {
      await Service.findOneAndUpdate(
        { service: service },
        { subservices: subservicesArr, offers: offerArr }
      );
    } else {
      newService.offers = offerArr;
      newService.subservices = subservicesArr;

      await newService.save();
    }
    reply.status(200).send({ message: "Serivce has been updated" });
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: err.message });
    return;
  }
};

const deleteServiceHandler = async (req, reply) => {
  try {
    const { serviceId } = req.params;
    await deleteService(serviceId);
    reply.send({ message: "Service Deleted" });
  } catch (err) {
    console.log(err);
    reply.send({ error: "Some error occured" });
  }
};

const updateServiceHandler = async (req, reply) => {
  try {
    const { serviceId } = req.params;

    const tempService = await Service.findById(serviceId);
    if (!tempService) {
      reply.status(404).send({ error: "Service not found" });
      return;
    }


    const serviceName = req.body.service ? req.body.service : tempService.service;
    let offerArr = tempService.offers;
    let subservicesArr = tempService.subservices;
    let serviceImages =
      req.body.service_image && req.body.service_image.length > 0
        ? req.body.service_image
        : tempService.service_image;
    const description = req.body.description
      ? req.body.description
      : tempService.description;
    const sequence = req.body.sequence ? req.body.sequence : tempService.sequence

    if (req.body.service) {
      const checkService = await Service.findOne({ service: req.body.service });
      if (checkService) {
        throw new Error(req.body.service + " Service already exists");
      }
    }

    if (req.body.subservices && req.body.subservices.length > 0) {
      for (let i = 0; i < req.body.subservices.length; i++) {
        const serv = await Service.findOne({ service: req.body.subservices[i].service });
        if (serv) {
          throw new Error(req.body.subservices[i].service + " subservice already exists");
        }
      }
    }

    // Update Offer Names
    if (req.body.service) {
      await serviceNameChangeHandler(
        serviceId,
        tempService.service,
        req.body.service
      );
    }
    await removeUnusedOffers(tempService);

    if (req.body.subservices && req.body.subservices.length > 0) {
      if (tempService.offers && tempService.offers.length > 0) {
        console.log("Services", req.body.subservices.length, tempService.offers.length)
        reply
          .status(401)
          .send({ error: "This Service already contain Offers." });
        return;
      } else {
        req.body.subservices.forEach((serv) => {
          const newSubServices = new Service({
            ...serv,
            level: parseInt(tempService.level) + 1,
          });
          console.log(newSubServices, req.body.subservices);
          newSubServices.save();
          subservicesArr.push(newSubServices["_id"].toString());
        });
      }
    }

    if (req.body.offers && req.body.offers.length > 0) {
      if (tempService.subservices && tempService.subservices.length > 0) {
        console.log("Offers", req.body.offers.length, tempService.subservices.length)
        reply.status(401).send({ error: "This Service already contains Subservices." });
        return;
      } else {
        req.body.offers.forEach((offer) => {
          const newOffer = new Offer({ ...offer });
          newOffer.save();

          offerArr.push(newOffer["_id"].toString());
        });
      }
    }

    await Service.updateOne(
      { _id: serviceId }, {
      description: description,
      service_image: serviceImages,
      service: serviceName,
      offers: offerArr,
      sequence: sequence,
      subservices: subservicesArr,
    }
    );

    reply.status(200).send({ message: "Service Updated" });
  } catch (err) {
    console.log(err);
    reply.status(400).send({ error: err.message });
  }
};

const updateServiceNameHandler = async (req, reply) => {
  try {
    const { service } = req.params;
    const { serviceName } = req.body;

    await Service.findOneAndUpdate(
      { service: service },
      { service: serviceName }
    );

    reply.status(200).send({ message: "Service Updated." });
  } catch (err) {
    reply.status(400).send({ error: "Some error occured." });
  }
}


module.exports = {
  getEndServicesHandler,
  getServiceHandler,
  getServicesHandler,
  addServiceHandler,
  updateServiceHandler,
  updateServiceNameHandler,
  deleteServiceHandler,
}