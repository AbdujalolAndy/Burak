import express from "express";
import path from "path";
import morgan from "morgan";
import routerAdmin from "./routers/router-bssr"
import routerMain from "./routers/router-spa";

import session from "express-session";
import MongodbSession from "connect-mongodb-session";


const app = express();
const MongodbStore = MongodbSession(session);
const store = new MongodbStore({
    uri: String(process.env.MONGODB_URL),
    collection: "sessions"
})

/** 1-ENTERANCE **/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan(`:method :url :response-time ms [:status] \n`))

/** 2-SESSION **/
app.use(
    session({
        secret: String(process.env.SECRET_TOKEN),
        cookie: {
            maxAge: 1000 * 3600 * 6, // 6h,
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
)

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTER **/
app.use("/", routerMain)       //SPA
app.use("/admin", routerAdmin) //SSR

export default app;