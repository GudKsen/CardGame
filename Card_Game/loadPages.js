import { homePage } from "./controllers/home-controller.js";
import { registrationPage } from "./controllers/registration-controller.js";
import { forgotPage } from ".//controllers/forgotPassword-controller.js";
import { loginPage } from "./controllers/login-controller.js";
import { greetingPage } from "./controllers/greeting-controller.js";


export const loadPages = (app) => {
    homePage(app);
    loginPage(app);
    registrationPage(app);
    greetingPage(app);
    forgotPage(app);
}

