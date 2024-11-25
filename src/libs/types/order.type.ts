import { ObjectId } from "mongoose"
import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product.type";

export interface OrderItemInput {
    itemQuantity: number;
    itemPrice: number;
    productId: string;
    orderId?: ObjectId;
}

export interface OrderItem {
    _id: ObjectId;
    itemQuantity: number;
    itemPrice: number;
    productId: ObjectId;
    orderId: ObjectId;
    createdAt: Date;
    updatedAt: Date
}

export interface Order {
    _id: ObjectId;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: ObjectId;
    createdAt: Date;
    updatedAt: Date;

    orderItems?: OrderItem[],
    productData?: Product[]
}

export interface OrderInput {
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: ObjectId;
}

export interface OrderInquiry {
    page: number,
    limit: number,
    orderStatus: OrderStatus;
}

export interface UpdateOrderInput {
    orderId: string;
    orderStatus: OrderStatus;
}