import express from "express";
import path from "path";
import morgan from "morgan";
import routerAdmin from "./routers/router-bssr"
import routerMain from "./routers/router-spa";

import session from "express-session";
import MongodbSession from "connect-mongodb-session";
import { localMemberVariable } from "./libs/middlewares/app.middleware";
import CookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import { Server as SocketIOServer } from "socket.io"
import { verifyMember } from "./libs/config";
import { InfoPayload, MessagePayload, MessagesPayload } from "./libs/types/socket.io";
import { Member } from "./libs/types/member.type";


const app = express();
const MongodbStore = MongodbSession(session);
const store = new MongodbStore({
    uri: String(process.env.MONGODB_URL),
    collection: "sessions"
})

/** 1-ENTERANCE **/
app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static("upload"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan(`:method :url :response-time ms [:status] \n`))
app.use(cors({ origin: true, credentials: true }))

/** 2-SESSION **/
app.use(
    session({
        secret: String(process.env.SECRET_SESSION),
        cookie: {
            maxAge: 1000 * 3600 * 6, // 6h,
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
)

app.use(CookieParser())

app.use(localMemberVariable)
/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTER **/
app.use("/", routerMain)       //SPA
app.use("/admin", routerAdmin) //SSR

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: true } });

let totalClients = 0
const socketClients = new Map()
const socketClientMessages: MessagePayload[] = []
io.on("connection", async (client) => {

    //Connection
    console.log("=== Socket.IO Connection ===")
    totalClients++

    let token = null
    let memberData = null
    if (client.request.headers.authorization) {
        token = client.request.headers.authorization?.split(" ")[1]
        memberData = await verifyMember(token) as Member;
        socketClients.set(client, memberData)
    }
    const connectionInfo: InfoPayload = {
        event: 'info',
        totalClients: totalClients,
        memberData: memberData,
        action: "joined"
    }
    console.info(`=== Connected [${memberData ? memberData?.memberNick : "GUEST"}] & total: ${totalClients} ===`);
    io.emit("info", connectionInfo)

    if (socketClientMessages.length > 5) socketClientMessages.splice(0, socketClientMessages.length - 5);

    let getMessagesPayload: MessagesPayload = {
        event: "messages",
        list: socketClientMessages
    }
    client.emit("getMessages", getMessagesPayload)

    //GET NEW MESSAGE
    client.on("message", (msg) => {
        const { text } = JSON.parse(msg)
        const msgPayload: MessagePayload = {
            event: "message",
            text,
            memberData: socketClients.get(client),
            action: "joined"
        }

        socketClientMessages.push(msgPayload);
        io.emit("message", JSON.stringify(msgPayload));
    })

    //Disconnection
    client.on("disconnect", () => {
        totalClients--
        console.info(`=== Disconnected [${memberData ? memberData.memberNick : "GUEST"}] & total: ${totalClients} ===`);
        const disconnectionInfo: InfoPayload = {
            event: "info",
            totalClients,
            memberData,
            action: "left"
        }
        client.broadcast.emit('info', disconnectionInfo)
    })
})

export default server;