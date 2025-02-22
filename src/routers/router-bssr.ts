import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller";
import productController from "../controllers/product.controller";
import { verifyRestaurant } from "../libs/middlewares/restaurant.middleware";
import { targetUploader } from "../libs/middlewares/app.middleware";
import memberController from "../controllers/member.controller";
const router = Router();

/*************SSR**************/
//RESTAURANT
router
    .get(
        "/",
        restaurantController.goHome
    );
router
    .get(
        "/login",
        restaurantController.getLogin
    )
    .post(
        "/login",
        restaurantController.processLogin
    );
router
    .get(
        "/signup",
        restaurantController.getSignup
    )
    .post(
        "/signup",
        targetUploader("members").single("memberImage"),
        restaurantController.processSignup
    );

router
    .get(
        "/check-auth",
        restaurantController.checkAuth
    );

//PRODUCT
router
    .get(
        "/product/all",
        verifyRestaurant,
        productController.getAllProducts
    )
    .post(
        "/product/create",
        verifyRestaurant,
        targetUploader("products").array("productImages", 5),
        productController.createProduct
    )
    .post(
        "/product/:id",
        verifyRestaurant,
        productController.updateChosenProduct
    )

//USER
router
    .get(
        "/user/all",
        verifyRestaurant,
        memberController.getAllUsers
    )
router
    .post(
        "/user/edit",
        verifyRestaurant,
        memberController.updateChosenUser
    )
export default router