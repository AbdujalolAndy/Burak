import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";
import http from "http"

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(data => {
        console.log("Mongodb successfully connected!");
        const PORT = process.env.PORT ?? 3005;
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`The server is successfully listening on ${PORT}`)
        })
    })
    .catch((err) => console.log("ERROR: ", err.message))
