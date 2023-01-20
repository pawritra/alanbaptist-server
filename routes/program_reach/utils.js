
const nodemailer = require("nodemailer");

const triggerMail = async (program) => {
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

  const emailTemplate = generateEmailTemplate(program);
  var mailOptions = {
    from: '"Optimal Wellness" <noreply@optimumwellness.in>',
    to: 'alan.optimumwellness@gmail.com,alanvidyushbaptist1995@gmail.com',
    subject: `program.Notification from Optimum Wellness`,
    text: `${program.name} sent you a Program Request through Optimum Wellness`,
    html: emailTemplate,
  };

  await transport.sendMail(mailOptions);
};

const generateEmailTemplate = (program) => {
  return `
      <html lang="en">
         <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </head>
         <body>
          <h1>You got a new program request from Optimum Wellness</h1>
          <ul style="list-style: none; ">
            <li><b>Name</b> ${program.name}</li>
            <li><b>Phone</b> ${program.phone}</li>
            <li><b>Email</b> ${program.email}</li>
            <li><b>Gender</b> ${program.gender}</li>
            <li><b>Age-Group</b> ${program.age_group}</li>
            <li><b>height</b> ${program.height}</li>
            <li><b>Weight</b> ${program.weight}</li>
            <li><b>Activity</b> ${program.activity}</li>
            <li><b>Goal</b> ${program.goal}</li>
          </ul>
            <h3><b>program./b></h3>
            <p>${program.message}</p>
         </body>
      </html>
    `;
};

module.exports = {
  triggerMail,
};
