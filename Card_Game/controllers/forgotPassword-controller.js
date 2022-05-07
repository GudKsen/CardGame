import User from "../models/user.js";
import { send } from '../sendEmail.js'

export const forgotPage = (app) => {
  app.get("/forgot", (req, res) => {
    res.render("forgot");
  });

  app.post("/forgot", async (req, res) => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 10;
    var password = "";

    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    let user = new User(req.body.login, password);
    console.log(password);
    user.updatePassword(res);
    send(req.body.email, req.body.login, password);

    return res.render("login", {});
  });
};