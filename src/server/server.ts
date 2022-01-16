import express, { json } from "express";
import router from "./routes/front/routes";
import morgan from "morgan";
import dotenv from "dotenv";
import config from "../../config";
var session = require("express-session");

dotenv.config();

const app = express();

app.use(json());
//app.set("view engine", "ejs");

app.use(morgan("tiny"));

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: false }));


app.use(router);
app.use(express.static(`${config.rootFolder}/src/public`));

export default app;
