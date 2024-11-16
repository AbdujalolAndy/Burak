import { Schema, model } from "mongoose"
import { ProductCollection, ProductSize, ProductStatus, ProductVolume } from "../libs/enums/product.enum"

const productSchema = new Schema({
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.PROCESS,
    },
    productCollection: {
        type: String,
        enum: ProductCollection,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        require: true
    },
    productLeftCount: {
        type: Number,
        required: true
    },
    productSize: {
        type: String,
        enum: ProductSize,
        default: ProductSize.NORMAL
    },
    productVolume: {
        type: String,
        enum: ProductVolume,
        default: ProductVolume.ONE
    },
    productDesc: {
        type: String,
    },
    productImages: {
        type: [String],
        default: []
    },
    productViews: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

productSchema.index({ productName: 1, productSize: 1, productVolume: 1 }, { unique: true });

export default model("Product", productSchema)