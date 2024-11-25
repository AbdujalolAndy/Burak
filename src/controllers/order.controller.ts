import OrderService from "../models/Order.service";
import { ExtendsRequest, T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Error";
import { Response } from "express";
import { OrderItemInput } from "../libs/types/order.type";

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

export default orderController;