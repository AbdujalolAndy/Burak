import mongoose from "mongoose"
import { ViewGroup } from "../enums/view.enum";

export interface View {
    _id: mongoose.Schema.Types.ObjectId;
    memberId: mongoose.Schema.Types.ObjectId;
    viewRefId: mongoose.Schema.Types.ObjectId;
    viewGroup: ViewGroup;
    createdAt: Date;
    updateAt: Date;
}
export interface ViewInput {
    memberId: mongoose.Schema.Types.ObjectId;
    viewRefId: mongoose.Schema.Types.ObjectId;
    viewGroup: ViewGroup;
}