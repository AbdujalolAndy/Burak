import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller";
import productController from "../controllers/product.controller";
const router = Router();

/*************SSR**************/
//RESTAURANT
router.get("/", restaurantController.goHome);
router
    .get("/login", restaurantController.getLogin)
    .post("/login", restaurantController.processLogin);
router
    .get("/signup", restaurantController.getSignup)
    .post("/signup", restaurantController.processSignup);

router.get("/check-auth", restaurantController.checkAuth);

//PRODUCT
router
    .get("/product/all", productController.getAllProducts)
    .post("/product/create", productController.createProduct)
    .post("/product/:id", productController.updateChosenOne)

export default router