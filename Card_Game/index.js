//import express from "express";
//import express from "express"
import express from "express"
import expressThymeleaf from "express-thymeleaf";
import session from "express-session";
import path from "path";
import { TemplateEngine } from "thymeleaf";
import bodyParser from "body-parser";
import { loadPages } from "./loadPages.js";

const PORT = process.env.PORT ?? 7703;

const app = express();
const __dirname = path.resolve();
const templateEngine = new TemplateEngine();
app.use("/public", express.static(path.join(__dirname, "/public")));
app.engine("html", expressThymeleaf(templateEngine));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    name: "idk",
    secret: "session secret",
    resave: false,
    saveUninitialized: true,
    path: "/",
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

loadPages(app);

app.use(function(req, res, next){
  res.status(404).render('404');
})

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
