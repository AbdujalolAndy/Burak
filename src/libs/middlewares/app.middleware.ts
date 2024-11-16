import { NextFunction, Request, Response } from "express";
import { T } from "../types/common";

export function localMemberVariable(req: T, res: Response, next: NextFunction) {
    res.locals.member = req.session.member;
    next()
}