import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(data => {
        console.log("Mongodb successfully connected!");
        const PORT = process.env.PORT ?? 3005;

    })
    .catch((err) => console.log("ERROR: ", err.message))
