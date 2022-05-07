import nodemailer from "nodemailer";

export function send(email, login, password) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d85299a81c3f7d",
      pass: "62dca82442db8a",
    },
  });

  var mailOptions = {
    from: '"Example Team" <admin@example.com>',
    to: email,
    subject: "New password",
    html: `<h1>Hello, ${login}</h1>
             <p>Here is your new password: ${password}</p>
             <p>Good time for you!</p>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}

