import express from "express";
import indexRoutes from "./routes/index.routes";
import exphbs from "express-handlebars";
import path, { join } from "path";
import { create } from "express-handlebars";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import { randomInt } from "crypto";

const Handlebars = require("handlebars");
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "/views"));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
  })
);

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.nivel = req.session.nivel;
  res.locals.idS = req.session.idS;
  next();
});

var hbs = create({
  layoutsDir: path.join(app.get("views"), "layouts"),
  defaultLayout: "main",
  extname: ".hbs",
});

app.engine(".hbs", hbs.engine);

app.set("view engine", ".hbs");

app.use(indexRoutes);

app.use(express.static(path.join(__dirname, "/static")));

Handlebars.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
  if (a != b) { return options.fn(this); }
  return options.inverse(this);
});

export default app;
