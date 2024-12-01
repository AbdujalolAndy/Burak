import { OrderInput, OrderInquiry, OrderItem, OrderItemInput, UpdateOrderInput } from "../libs/types/order.type";
import { Member } from "../libs/types/member.type";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { Order } from "../libs/types/order.type";
import { OrderStatus } from "../libs/enums/order.enum";
import { shapeIntoMongodbObject } from "../libs/config";
import { ObjectId } from "mongoose"
import Errors, { HttpCode, Message } from "../libs/Error";
import MemberService from "./Member.service";

class OrderService {
    private readonly orderModel;
    private readonly oderItemModel;
    private readonly memberService;

    constructor() {
        this.orderModel = OrderModel;
        this.oderItemModel = OrderItemModel;
        this.memberService = new MemberService();
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

    public async getOrders(member: Member, orderInquiry: OrderInquiry): Promise<Order[]> {
        try {
            const { page, limit, orderStatus } = orderInquiry
            const match = { memberId: shapeIntoMongodbObject(member._id), orderStatus: orderStatus };

            const orders = await this.orderModel.aggregate([
                { $match: match },
                { $sort: { updatedAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $lookup: {
                        from: "orderItems",
                        localField: '_id',
                        foreignField: "orderId",
                        as: "orderItems"
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "orderItems.productId",
                        foreignField: "_id",
                        as: "productsData"
                    }
                }
            ]).exec()

            return orders
        } catch (err: any) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)
        }
    }

    public async updateOrder(member: Member, input: UpdateOrderInput): Promise<Order> {
        try {
            const orderId = shapeIntoMongodbObject(input.orderId);
            const memberId = shapeIntoMongodbObject(member._id);

            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId, memberId: memberId },
                { orderStatus: input.orderStatus },
                { new: true }
            ).exec()

            if (!updatedOrder) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)

            if (input.orderStatus === OrderStatus.PROCESS) {
                await this.memberService.updateMemberPoint(memberId, 1)
            }
            return updatedOrder
        } catch (err: any) {
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
        }
    }
}

export default OrderService