import { Session } from "express-session"
import { Member } from "./member.type";
import { Request } from "express";

export interface T {
    [key: string]: any
}

export interface ExtendsRequest extends Request {
    member: Member;
    file: Express.Multer.File;
    files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
    member: Member;
    session: Session & { member: Member };
    file: Express.Multer.File;
    files: Express.Multer.File[];
}