import { NextFunction, Response } from "express";
import { T } from "../types/common";
import Errors, { HttpCode, Message } from "../Error";
import AuthService from "../../models/Auth.service";

export async function verifyMember(req: T, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.accessToken as string;
        if (!token) throw new Errors(HttpCode.UNAUTHORIZED, Message.UNAUTHENTICATED);

        const authService = new AuthService()
        req.member = await authService.verifyMember(token)

        next()
    } catch (err: any) {
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export async function RetrieveMember(req: T, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.accessToken as string;
        if (!token) throw new Errors(HttpCode.UNAUTHORIZED, Message.UNAUTHORIZED);

        const authService = new AuthService()
        req.member = await authService.verifyMember(token)

        next()
    } catch (err: any) {
        next()
    }
}