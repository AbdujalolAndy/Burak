import mongoose from "mongoose";

export function shapeIntoMongodbObject(id: string): mongoose.Types.ObjectId {
    return typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
}