import { Router } from "express"
import memberController from "../controllers/member.controller";
const router = Router();

/*************SPA**************/
router
    .post("/signup", memberController.signup)
    .post("/login", memberController.login)

export default router