import { ObjectId } from "mongoose";
import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";

export interface Product {
    _id: ObjectId;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productVolume: number;
    productDesc?: string;
    productImages: string[] | [];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ProductInput {
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize?: ProductSize;
    productVolume?: number;
    productDesc?: string;
    productImages?: string[] | [];
    productViews?: number;
}

export interface ProductUpdateInput {
    _id: string;
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productSize?: ProductSize;
    productVolume?: number;
    productDesc?: string;
    productImages?: string[] | [];
    productViews?: number;
}

export interface ProductInquiry {
    page: number;
    limit: number;
    order: string;
    productCollection?: ProductCollection;
    search?: string;

}