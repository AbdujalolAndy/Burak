import { OrderInput, OrderItem, OrderItemInput } from "../libs/types/order.type";
import { Member } from "../libs/types/member.type";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { Order } from "../libs/types/order.type";
import { OrderStatus } from "../libs/enums/order.enum";
import { shapeIntoMongodbObject } from "../libs/config";
import { ObjectId } from "mongoose"
import Errors, { HttpCode, Message } from "../libs/Error";

class OrderService {
    private readonly orderModel;
    private readonly oderItemModel;

    constructor() {
        this.orderModel = OrderModel;
        this.oderItemModel = OrderItemModel
    }

    public async createOrder(member: Member, input: OrderItemInput[]): Promise<void> {
        const itemsAmount = input.reduce((a: number, orderItem: any) =>
            a += orderItem.itemPrice * orderItem.itemQuantity
            , 0)
        const deliveryDiscount = itemsAmount > 100 ? 0 : 5;
        const totalAmount = itemsAmount + deliveryDiscount;

        const orderInput: OrderInput = {
            orderTotal: totalAmount,
            orderDelivery: deliveryDiscount,
            orderStatus: OrderStatus.PAUSE,
            memberId: shapeIntoMongodbObject(member._id)
        }
        try {
            const order = await this.orderModel.create(orderInput);
            const orderId = order._id;
            await this.recordOrderItem(orderId, input);

            return order
        } catch (err: any) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }

    private async recordOrderItem(orderId: ObjectId, orderItems: OrderItemInput[]): Promise<void> {
        try {
            const pendingList = orderItems.map(async (orderItem: OrderItemInput) => {
                const orderItemInput = {
                    itemQuantity: orderItem.itemQuantity,
                    itemPrice: orderItem.itemPrice,
                    orderId,
                    productId: shapeIntoMongodbObject(orderItem.productId)
                }
                return await this.oderItemModel.create(orderItemInput)
            })
            await Promise.all(pendingList);
        } catch (err: any) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }
}

export default OrderService