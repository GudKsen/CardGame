import User from "../models/user.js";

export const loginPage = (app) => {
  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.render("greeting", {
        login: req.session.user.login,
        userStatus: req.session.user.userStatus,
      });
    }
    res.render("login");
  });

  app.post("/login", (req, res) => {
    let user = new User(req.body.login, req.body.password);
    user.find(req, res);
  });
};
