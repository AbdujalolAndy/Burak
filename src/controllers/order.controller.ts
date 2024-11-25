import OrderService from "../models/Order.service";
import { ExtendsRequest, T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Error";
import { Response } from "express";
import { OrderInquiry, OrderItemInput } from "../libs/types/order.type";
import { OrderStatus } from "../libs/enums/order.enum";

const orderController: T = {};
const orderService = new OrderService();

orderController.createOrder = async (req: ExtendsRequest, res: Response) => {
    try {
        console.log("METHOD: createOrder");
        const input: OrderItemInput[] = req.body,
            member = req.member;

        const order = await orderService.createOrder(member, input);

        res.status(HttpCode.CREATED).json({ order })
    } catch (err: any) {
        console.log(`Error: createOrder, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

orderController.getOrders = async (req: ExtendsRequest, res: Response) => {
    try {
        console.log("METHOD: getOrders");
        const inquiry = req.query;
        const orderInquiry: OrderInquiry = {
            page: Number(inquiry.page),
            limit: Number(inquiry.limit),
            orderStatus: inquiry.orderStatus as OrderStatus,
        }
        
        const orders = await orderService.getOrders(req.member, orderInquiry);

        res.status(HttpCode.OK).json({ orders })
    } catch (err: any) {
        console.log(`Error: getOrders, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export default orderController;