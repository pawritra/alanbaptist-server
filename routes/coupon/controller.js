const Coupon = require("../../models/coupon").Coupon;

const getCouponHandler = async (req, reply) => {
  try {
    const coupons = await Coupon.find();

    reply.status(200).send(coupons);
  } catch (err) {
    reply.status(400).send({ error: "Some error occured." });
  }
};

const addCouponHandler = async (req, reply) => {
  try {
    let coupon = await Coupon.findOne({ code: req.body.code });
    if (coupon) {
      coupon = await Coupon.updateOne({ code: req.body.code }, { ...req.body });
    } else {
      coupon = new Coupon({ ...req.body });
      await coupon.save();
    }

    reply.status(200).send(coupon);
  } catch (err) {
    reply.status(400).send({ error: "Some error occured." });
  }
};

const deleteCouponHandler = async (req, reply) => {
  try {
    const { id } = req.params;

    await Coupon.findByIdAndDelete(id);
    reply.status(200).send({ message: "Coupon Deleted" });
  } catch (err) {
    reply.status(400).send({ error: "Some error occured." });
  }
};


module.exports = {
  addCouponHandler,
  getCouponHandler,
  deleteCouponHandler
}
