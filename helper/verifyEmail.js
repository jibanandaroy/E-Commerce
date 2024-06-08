const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "jibonroy282@gmail.com",
    pass: "rcyp cuat kuvu fbtj",
  },
});


async function verifyEmail(receiver, subject, html) {
 
  const info = await transporter.sendMail({
    from: 'jibonroy282@gmail.com', 
    to: receiver, 
    subject , 
    html,
  });

  console.log("Message sent: %s", info.messageId);

}


module.exports = verifyEmail;