import { Router } from "express"
import memberController from "../controllers/member.controller";
import { verifyMember } from "../libs/middlewares/member.middleware";
const router = Router();

/*************SPA**************/
router
    .post("/member/signup", memberController.signup)
    .post("/member/login", memberController.login)
    .post(
        "/member/logout",
        verifyMember,
        memberController.logout
    )

/*************SPA TEST**************/
router.get(
    "/member/detail",
    verifyMember,
    memberController.getMemberDetail
)

export default router