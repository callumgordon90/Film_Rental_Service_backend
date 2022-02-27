const nodemailer = require("nodemailer");

const user = "root";
const pass = "1234";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your email.",
    html: `<h1>Activation of account message</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering 
        Please confirm your email address by clinking on the following link.</p>
        <a href=http://localhost:3005/users/confirm/${confirmationCode}> Activate account.</a>
        </div>`,
  }).catch(err => console.log(err));
};
