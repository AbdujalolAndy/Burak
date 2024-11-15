import MemberService from "../models/Member.model";
import { T } from "../libs/types/common";
import { Request, Response } from "express"
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { LoginInput, Member, MemberInput } from "../libs/types/member/member.type";

const restaurantController: T = {}

//**SSR */
restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: processSignup");
        const input: MemberInput = req.body;
        input.memberType = MemberType.RESTAURANT;

        const memberService = new MemberService();
        const result: Member = await memberService.processSignup(input);
        //Session Token

        res.send(result)
    } catch (err: any) {
        console.log(`Error: processSignup, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: processLogin");
        const input: LoginInput = req.body;

        const member = new MemberService();
        const result: Member = await member.processLogin(input)
        //Session Token
        res.send(result)
    } catch (err: any) {
        console.log(`Error: processLogin, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}


export default restaurantController