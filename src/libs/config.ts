import mongoose from "mongoose";

export const AUTH_DURATION = 24;
export function shapeIntoMongodbObject(id: string): mongoose.Types.ObjectId {
    return typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
}