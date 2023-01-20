
const nodemailer = require("nodemailer");

const triggerMail = async (message) => {
  const transport = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "noreply@optimumwellness.in",
      pass: "@Asd1234",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailTemplate = generateEmailTemplate(message);
  var mailOptions = {
    from: '"Optimal Wellness" <noreply@optimumwellness.in>',
    to: 'alan.optimumwellness@gmail.com,alanvidyushbaptist1995@gmail.com',
    subject: `Message Notification from Optimum Wellness`,
    text: `${message.name} sent you a message through Optimum Wellness`,
    html: emailTemplate,
  };

  await transport.sendMail(mailOptions);
};

const generateEmailTemplate = (message) => {
  return `
      <html lang="en">
         <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </head>
         <body>
          <h1>You got a new message from Optimum Wellness</h1>
          <ul style="list-style: none; ">
            <li><b>Name</b> ${message.name}</li>
            <li><b>Email</b> ${message.email}</li>
            <li><b>Phone</b> ${message.phone}</li>
          </ul>
            <h3><b>Message</b></h3>
            <p>${message.message}</p>
         </body>
      </html>
    `;
};

module.exports = {
  triggerMail,
};
