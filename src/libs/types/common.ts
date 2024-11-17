import { Session } from "express-session"
import { Member } from "./member/member.type";
import { Request } from "express";

export interface T {
    [key: string]: any
}

export interface AdminRequest extends Request {
    member: Member;
    session: Session & { member: Member };
    file: Express.Multer.File;
    files: Express.Multer.File[];
}