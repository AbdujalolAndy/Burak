import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import server from "./app";

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(data => {
        console.log("Mongodb successfully connected!");
        const PORT = process.env.PORT ?? 3005;
        server.listen(PORT, () => {
            console.info(`The server is successfully listening on ${PORT}`);
            console.info(`The Admin is on http://localhost:${PORT}/admin \n`)
        })
    })
    .catch((err) => console.log("ERROR: ", err.message))
