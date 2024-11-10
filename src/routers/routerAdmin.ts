import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller";
const router = Router();

/*************GET**************/
router.get("/", restaurantController.goHome);
router.get("/login", restaurantController.getLogIn);
router.get("/signup", restaurantController.getSignUp)

export default router