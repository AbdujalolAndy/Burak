import dotenv from "dotenv";
dotenv.config();

console.log("Port:", process.env.PORT);
console.log("Mongodb:", process.env.MONGODB_URL);