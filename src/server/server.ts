import express, { json } from "express";
import router from "./routes/front/routes";
import morgan from "morgan";
import dotenv from "dotenv";
import config from "../../config";

dotenv.config();

const app = express();

app.use(json());
//app.set("view engine", "ejs");

app.use(morgan("tiny"));

app.use(router);
app.use(express.static(`${config.rootFolder}/src/public`));

export default app;
