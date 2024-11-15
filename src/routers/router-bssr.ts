import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller";
const router = Router();

/*************SSR**************/
router.get("/", restaurantController.goHome)
router
    .get("/login", restaurantController.getLogin)
    .post("/login", restaurantController.processLogin);
router
    .get("/signup", restaurantController.getSignup)
    .post("/signup", restaurantController.processSignup)

router.get("/check-auth", restaurantController.checkAuth)
export default router