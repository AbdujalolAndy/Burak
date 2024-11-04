import express from "express";
import path from "path";

const app = express();

/** 1-ENTERANCE **/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

/** 2-SESSION **/
/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTER **/

export default app;