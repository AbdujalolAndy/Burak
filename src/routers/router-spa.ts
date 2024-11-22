import { Router } from "express"
import memberController from "../controllers/member.controller";
import { retrieveMember, verifyMember } from "../libs/middlewares/member.middleware";
import { targetUploader } from "../libs/middlewares/app.middleware";
const router = Router();

/*************SPA**************/

//MEMBER
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



export default router