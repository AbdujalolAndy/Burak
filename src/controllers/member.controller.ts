import { T } from "../libs/types/common";
import { Request, Response } from "express"
import { LoginInput, Member, MemberInput } from "../libs/types/member/member.type";
import Errors, { HttpCode } from "../libs/Error";
import MemberService from "../models/Member.service";

const memberController: T = {}

//**SPA */
memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: signup");
        const input: MemberInput = req.body;

        const member = new MemberService(),
            result: Member = await member.signup(input);
        //TOKEN

        res.json({ member: result })
    } catch (err: any) {
        console.log(`Error: signup, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: login");
        const input: LoginInput = req.body;

        const member = new MemberService(),
            result: Member = await member.login(input);
        //TOKEN

        res.json({ member: result })
    } catch (err: any) {
        console.log(`Error: login, HttpCode: [${err.code}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}


export default memberController