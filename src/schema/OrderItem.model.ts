import mongoose, { Schema, model } from "mongoose";


const orderItemSchema = new Schema({
    itemQuantity: {
        type: Number,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }
}, { timestamps: true, collection: "orderItems" });


export default model("OrderItem", orderItemSchema)
