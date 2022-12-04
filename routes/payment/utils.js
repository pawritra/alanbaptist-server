const nodemailer = require('nodemailer')
const dayjs = require('dayjs')

const triggerMail = async (offer, user, date) => {
  const transport = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "info@alanbaptist.com",
      pass: "@Asd1234",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log("here")
  const emailTemplate = generateEmailTemplate(offer, user, date);
  var mailOptions = {
    from: '"Optimal Wellness" <info@alanvidyushbaptist.com>',
    to: user.email,
    subject: `Order Confirmation for ${offer.offer_name.split('_')[offer.offer_name.split('_').length - 1]}`,
    text: `Order Confirmation for ${offer.offer_name.split('_')[offer.offer_name.split('_').length - 1]}`,
    html: emailTemplate,
  };
  console.log(offer, user, date)
  await transport.sendMail(mailOptions);
};

const generateEmailTemplate = (offer, user, date) => {
  let totalPrice, discount;
  totalPrice = offer.price;
  if (offer.discounted_price && offer.discounted_price > 0) {
    discount = offer.discounted_price;
  } else {
    discount = null;
  }
  let formatted_date = dayjs(date).format("D MMMM, YYYY");

  return `
      <html lang="en">
         <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </head>
         <body>
        <div style="max-width: 600px; background-color: #e1e1e1; margin: auto; margin-top: 20px; padding-bottom: 30px">
           <div style="background: linear-gradient(to bottom, #433074 0%, #a364a2 100%); height: 150px; text-align: center; display: flex;">
          <img src="https://alanvidyushbaptist.com/assets/logo/Optimal_Wellness.png" style="margin: auto; width: 200px">
           </div>
           <div class="p-40" style="max-width: 400px; background-color: #ffffff; margin: auto; padding: 30px;">
          <div style="text-align: center; font-size: 30px; font-weight: 800;">Hello, ${user.name
    }!</div>
          <div style="text-align: justify; font-size: 16px; color: #777777; margin-top: 40px">
             Thank you for enrolling for a <span style="color: #000000"><b>${offer.duration
    }</b></span> plan for the <span style="color: #000000"><b>${offer.offer_name.split('_')[offer.offer_name.split('_').length - 1]}</b></span> programme.
          </div>
          <div style="font-size: 14px; margin-top: 30px">
             Your service is confirmed on ${formatted_date}
          </div>
          <div style="background-color: #fefefe; margin-top: 30px; border-radius: 5px;">
             <div style="border-bottom: 1.5px solid #e6e6eb; padding-bottom: 10px">
                <p style="font-size: 20px; font-weight: 500;  margin-bottom: 0;">Price Details</p>
             </div>
             <div style="display: flex; margin-top: 20px">
                <div style="width: 70%">
               <p style="font-size: 14px; color: #94969f; margin-bottom: 0px; margin-top: 0px">Total MRP</p>
                </div>
                <div style="width: 30%; text-align: right">
               <span>
               <span style="font-size:inherit;font-weight:500">₹</span>
               ${totalPrice}
               </span>
                </div>
             </div>
             ${discount && (
      `<div style="display: flex; margin-top: 10px; border-bottom: 1.5px solid #e6e6eb; padding-bottom: 10px">
               <div style="width: 70%">
              <p style="font-size: 14px; color: #94969f; margin-bottom: 0px; margin-top: 0px">Discount on MRP</p>
               </div>
               <div style="width: 30%; text-align: right">
              <span>
              <span style="font-size:inherit;font-weight:500">₹</span>
               ${totalPrice - discount} 
              </span>
               </div>
            </div>`
    )}

             <div style="display: flex; margin-top: 10px; margin-bottom: 30px">
                <div style="width: 70%">
               <p style="font-size: 16px; font-weight: 500;  margin-bottom: 0; margin-top: 0">Total Amount</p>
                </div>
                <div style="width: 30%; text-align: right">
               <span>
               <span style="font-size:inherit;font-weight:500">₹</span>
                  ${discount} 
               </span>
                </div>
             </div>
          </div>
          <div style="text-align: justify; font-size: 16px; color: #777777; margin-top: 40px">
             Our team of esteemed specialists are keenly looking forward towards <span style="color: #000000"><b>OPTIMIZING</b></span> your <span style="color: #000000"><b>${offer.offer_name.replaceAll('_', '-')}</b></span> WELLNESS through our collective expertise.
             <br><br><br><br><br>
             Regards,<br>
             Alan Baptist
          </div>
           </div>
        </div>
         </body>
      </html>
    `;
};

module.exports = {
  triggerMail
}