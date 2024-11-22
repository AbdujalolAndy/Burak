import mongoose from "mongoose";

export const AUTH_DURATION = 24;
export function shapeIntoMongodbObject(id: any): mongoose.Types.ObjectId {
    return typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
}