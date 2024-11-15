import MemberService from "../models/Member.model";
import { AdminRequest, T } from "../libs/types/common";
import { Request, Response } from "express"
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { LoginInput, Member, MemberInput } from "../libs/types/member/member.type";

const restaurantController: T = {}

//**SSR */
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("METHOD: goHome");
        res.render("home")
    } catch (err: any) {
        console.log(`Error: goHome, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).send(err);
        else res.status(Errors.standard.code).send(Errors.standard);
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("METHOD: getSignup");
        res.render("signup")
    } catch (err: any) {
        console.log(`Error: getSignup, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).send(err);
        else res.status(Errors.standard.code).send(Errors.standard);
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("METHOD: getLogin");
        res.render("login")
    } catch (err: any) {
        console.log(`Error: getLogin, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).send(err);
        else res.status(Errors.standard.code).send(Errors.standard);
    }
};

restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("METHOD: processSignup");
        const input: MemberInput = req.body;
        input.memberType = MemberType.RESTAURANT;

        const memberService = new MemberService();
        const result: Member = await memberService.processSignup(input);

        req.session.member = result;
        req.session.save(function () {
            res.send(result)
        })

    } catch (err: any) {
        console.log(`Error: processSignup, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("METHOD: processLogin");
        const input: LoginInput = req.body;

        const member = new MemberService();
        const result: Member = await member.processLogin(input)

        req.session.member = result;
        req.session.save(function () {
            res.send(result)
        })
    } catch (err: any) {
        console.log(`Error: processLogin, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

//Checking Verified client info;
restaurantController.checkAuth = (req: AdminRequest, res: Response) => {
    try {
        console.log("METHOD: checkAuth");
        if (req.session?.member) {
            res.send(`<script>alert(${req.session?.member?.memberNick})</script>`)
        } else {
            res.send(`<script>alert(You are not authorized client!)</script>`)
        }
    } catch (err: any) {
        console.log(`Error: processLogin, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`)
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}


export default restaurantController