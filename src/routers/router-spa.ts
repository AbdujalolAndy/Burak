import { Router } from "express"
import memberController from "../controllers/member.controller";
const router = Router();

/*************SPA**************/
router
    .post("/member/signup", memberController.signup)
    .post("/member/login", memberController.login)

/*************SPA TEST**************/
router.get("/member/verify", memberController.verifyMember)

export default router