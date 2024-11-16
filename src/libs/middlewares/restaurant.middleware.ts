import { NextFunction, Response } from "express";
import { AdminRequest } from "../types/common";
import { MemberType } from "../enums/member.enum";
import { Message } from "../Error";

export function verifyRestaurant(req: any, res: Response, next: NextFunction) {
    if (req.session?.member?.memberType === MemberType.RESTAURANT) {
        req.member = req.session.member;
        next()
    } else {
        res.send(`<script>alert(${Message.UNAUTHORIZED}); window.location.replace("/admin/login")</script>`)
    }
}