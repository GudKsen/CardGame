export const greetingPage = (app) => {
    app.get("/greeting", (req, res) => {
      if (!req.session.user) {
        res.redirect("/");
      }
      res.render("greeting");
    });
  
    app.post("/log_out", (req, res) => {
      req.session.destroy();
      res.render("home");
    });
  };
  