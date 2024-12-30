import mongoose from "mongoose";
import jwt from "jsonwebtoken"

export const AUTH_DURATION = 24;
export function shapeIntoMongodbObject(id: any): mongoose.Schema.Types.ObjectId {
    return typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
}

export const verifyMember = async (token:string)=>{
    return await jwt.verify(token, String(process.env.SECRET_TOKEN))
}