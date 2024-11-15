import express from "express";
import path from "path";
import morgan from "morgan";
import routerAdmin from "./routers/router-bssr"
import routerMain from "./routers/router-spa";

const app = express();

/** 1-ENTERANCE **/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan(`:method :url :response-time ms [:status] \n`))

/** 2-SESSION **/

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTER **/
app.use("/", routerMain)       //SPA
app.use("/admin", routerAdmin) //SSR

export default app;