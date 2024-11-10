import {Router} from "express"
import memberController from "../controllers/member.controller";
const router = Router();

/*************GET**************/
router.get("/", memberController.goHome);
router.get("/login", memberController.getLogIn);
router.get("/signup", memberController.getSignUp)

export default router