import User from "../models/user.js";

export const registrationPage = (app) => {
  app.get("/registration", (req, res) => {
    if (req.session.user) {
      res.render("greeting", {
        login: req.session.user.login,
        userStatus: req.session.user.userStatus,
      });
    }
    res.render("registration");
  });

  app.post("/registration", (req, res) => {
    let user = new User(
      req.body.login,
      req.body.password,
      req.body.fullName,
      req.body.email
    );
    user.save(res);
  });
};
