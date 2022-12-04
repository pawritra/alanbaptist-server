const Offer = require("../../models/offer").Offer;
const Order = require("../../models/order").Receipt;
const Coupon = require("../../models/coupon").Coupon;
const Razorpay = require("../../razorpay");
const { triggerMail } = require("./utils");


const generatePayment = async (req, reply) => {
  try {
    let coupon = null;
    let totalPrice = 0;
    let offers = [];
    let discounted_price = null;
    const { offerIds, couponCode, name, email, phone, type } = req.body;

    if (!type) {
      reply.status(404).send({ error: "Type is not defined" });
      return;
    }

    offerIds.forEach(async (offerId, index) => {
      console.log(offerId)
      const offer = await Offer.findById(offerId);
      if (!offer) {
        reply
          .status(404)
          .send({ error: "One or more than one offer does not exist" });
        return;
      }

      offers.push(offer["_id"].toString());

      if (offer.discounted_price > 0) {
        totalPrice = totalPrice + offer.discounted_price;
      } else {
        totalPrice = totalPrice + offer.price;
      }

      // End Function
      if (index === offerIds.length - 1) {
        if (couponCode) {
          coupon = await Coupon.findOne({ code: couponCode });
          if (!coupon) {
            reply.status(404).send({ error: "Coupon does not exist" });
            return;
          }

          discounted_price = totalPrice - coupon.discount;
        }

        const order = new Order({
          amount: couponCode ? discounted_price : totalPrice,
          currency: "INR",
          offers: offers,
          coupon: couponCode,
          type: type,
          name: name,
          email: email,
          phone: phone,
        });

        var options = {
          amount: order.amount * 100,
          currency: order.currency,
          receipt: order["_id"].toString(),
        };

        await order.save();
        if (type === "ONLINE") {
          Razorpay.orders.create(options, function (err, resorder) {
            reply.status(200).send({
              order_id: resorder.id,
              amount: order.amount * 100,
              couponCode: couponCode,
              receipt_id: order["_id"].toString(),
            });
          });
        } else {
          for (let i = 0; i < order.offers.length; i++) {
            const offer = await Offer.findById(order.offers[i]);
            await triggerMail(offer, {
              name: order.name,
              email: order.email
            },
              order.date)
          }

          reply.status(200).send({
            amount: order.amount * 100,
            couponCode: couponCode,
            receipt_id: order["_id"].toString(),
          });
        }
      }
    });
  } catch (err) {
    reply.status(400).send({ error: err.message });
    return;
  }
};

const verifyPayment = async (req, reply) => {
  try {
    const {
      razorpay_signature,
      razorpay_payment_id,
      razorpay_order_id,
      receipt_id,
      type,
    } = req.body;

    if (type && type.toLowerCase() === "cash") {
      await Receipt.findByIdAndUpdate(receipt_id, {
        status: "Successful",
      });
      reply.status(200).send({ message: "Order Successful" });
      return;
    }

    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    // Verify with Razorpay
    var expectedSignature = crypto
      .createHmac("sha256", process.env.RZP_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log("sig received ", req.body.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    if (expectedSignature === req.body.razorpay_signature) {
      // Update in Server
      const rec = await Receipt.findById(receipt_id);
      for (let i = 0; i < rec.offers.length; i++) {
        const offer = await Offer.findById(rec.offers[i]);
        await triggerMail(offer, { name: rec.name, email: rec.email }, rec.date);
      }

      const newReceipt = await Receipt.findByIdAndUpdate(receipt_id, {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "Successful",
      });

      console.log(newReceipt);
      reply.status(200).send({ message: "Order Valid and Successful" });
    } else {
      reply.status(500).send({ error: "Signature not valid" });
    }
  } catch (err) {
    console.log(err);
    reply.status(500).send({ error: "Signature not valid" });
  }
}

const applyCoupon = async (req, reply) => {
  try {
    let totalPrice = 0;
    const { offerIds, couponCode } = req.body;

    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      reply.status(404).send({ error: "Coupon does not exist" });
      return;
    }

    offerIds.forEach(async (offerId, index) => {
      const offer = await Offer.findById(offerId);
      if (!offer) {
        reply
          .status(404)
          .send({ error: "One or more than one offer does not exist" });
        return;
      }
      if (offer.discounted_price > 0) {
        totalPrice = totalPrice + offer.discounted_price;
      } else {
        totalPrice = totalPrice + offer.price;
      }
      if (index === offerIds.length - 1) {
        console.log("Total Price:", totalPrice);
        const discounted_price = totalPrice - coupon.discount;

        reply.status(200).send({
          price: totalPrice,
          discount: coupon.discount,
          discounted_price: discounted_price,
        });
      }
    });
  } catch (err) {
    reply.status(400).send({ error: "Some error occured" });
  }
}

module.exports = {
  generatePayment,
  verifyPayment,
  applyCoupon
}