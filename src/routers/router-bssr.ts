import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller";
const router = Router();

/*************SSR**************/
router
    .post("/login", restaurantController.processLogin);
router
    .post("/signup", restaurantController.processSignup)

export default router