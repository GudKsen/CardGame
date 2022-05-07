export const homePage = (app) => {
    app.get("/", (req, res) => {
      if (req.session.user) {
        res.render("greeting", {
          login: req.session.user.login,
          userStatus: req.session.user.userStatus,
        });
      } else {
        res.render("home");
      }
    });
  };
  