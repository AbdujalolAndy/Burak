import { T } from "../libs/types/common";
import { Request, Response } from "express"
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member.type";
import Errors, { HttpCode } from "../libs/Error";
import MemberService from "../models/Member.service";
import AuthService from "../models/Auth.service";
import { AUTH_DURATION } from "../libs/config";

const memberController: T = {}

//**SPA */
memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: signup");
        const input: MemberInput = req.body;

        const member = new MemberService(),
            result: Member = await member.signup(input);
        //TOKEN Authentication

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

        const authService = new AuthService();
        const token = await authService.createToken(result);

        res.cookie("accessToken", token,
            {
                maxAge: AUTH_DURATION * 3600 * 1000,
                httpOnly: false
            }
        );

        res.status(HttpCode.OK).json({ member: result, accessToken: token })
    } catch (err: any) {
        console.log(`Error: login, HttpCode: [${err.code}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

//SSR
memberController.getAllUsers = async (req: Request, res: Response) => {
    try {
        console.log('METHOD: getAllUsers');

        const member = new MemberService();
        const members: Member[] = await member.getAllUsers();

        res.render("users", { members })
    } catch (err: any) {
        console.log(`Error: login, HttpCode: [${err.code}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

memberController.updateChosenUser = async (req: Request, res: Response) => {
    try {
        console.log('METHOD: updateChosenUser');
        const input: MemberUpdateInput = req.body;

        const memeber = new MemberService(),
            result: Member = await memeber.updateChosenUser(input)
        res.status(HttpCode.OK).json({ result });
    } catch (err: any) {
        console.log(`Error: login, HttpCode: [${err.code}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export default memberController