import { Router } from "express"
import memberController from "../controllers/member.controller";
import { retrieveMember, verifyMember } from "../libs/middlewares/member.middleware";
import { targetUploader } from "../libs/middlewares/app.middleware";
import productController from "../controllers/product.controller";
import orderController from "../controllers/order.controller";
const router = Router();

/*****************SPA****************/

/*****MEMBER*******/
router.get(
    "/member/restaurant",
    memberController.getRestaurant
)
router
    .post(
        "/member/signup",
        memberController.signup
    )
    .post(
        "/member/login",
        memberController.login
    )
    .post(
        "/member/logout",
        verifyMember,
        memberController.logout
    )
    .post(
        "/member/update",
        verifyMember,
        targetUploader("members").single("memberImage"),
        memberController.updateMember
    )
    .get(
        "/member/detail",
        verifyMember,
        memberController.getMemberDetail
    )
    .get(
        "/member/top-users",
        retrieveMember,
        memberController.getTopUsers
    )

/****PRODUCTS*****/
router
    .get(
        "/product/all",
        productController.getProducts
    )
    .get(
        "/product/:id",
        retrieveMember,
        productController.getProduct
    )

/****ORDER*****/
router
    .post(
        "/order/create",
        verifyMember,
        orderController.createOrder
    )
    .get(
        "/order/all",
        verifyMember,
        orderController.getOrders
    )
    .post(
        "/order/update",
        verifyMember,
        orderController.updateOrder
    )

export default router