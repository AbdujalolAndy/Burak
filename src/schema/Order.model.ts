import mongoose, { Schema, model } from "mongoose";
import { OrderStatus } from "../libs/enums/order.enum";

const orderSchema = new Schema({
    orderTotal: {
        type: Number,
        required: true,
    },
    orderDelivery: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: OrderStatus,
        default: OrderStatus.PAUSE
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    }
}, { timestamps: true });


export default model("Order", orderSchema)
