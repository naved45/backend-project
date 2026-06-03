require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"naved bagwan" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to backend ledger";
  const text = ` hello ${name}, \n\n Thank you for registration at backend ledger. We're excited to have you n board ! \n\n Best regards, \n The Backend Ldeger Team`;
  const html = ` <p> hello ${name},</p><P> Thank you registration at backend Ledger . We're excited to have you on board !</p><p> Best regards,<br> The Backend LEdger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amout, toAccount) {
  const subject = "Transaction Successful";
  const text = `hello ${name},\n\n Yoour tranasaction of ${amount} to account was successful .\n\n Best regards,\n The Backend ledger`;
  const html = `<p> Hello ${name} <\p><p> your transaction of ${amount}to account ${toAccount} was successfully <\p><p> Best regards,<br> The Backend Ledger`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(
  userEmail,
  name,
  amount,
  transaction,
) {
  const subject = "Transaction Failed";
  const text = `hello ${name},\n\n Yoour tranasaction of ${amount} to account failed .\n\n Best regards,\n The Backend ledger`;
  const html = `<p> Hello ${name} <\p><p> your transaction of ${amount}to account ${toAccount} failed <\p><p> Best regards,<br> The Backend Ledger`;
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionFailureEmail,
  sendTransactionEmail,
};
