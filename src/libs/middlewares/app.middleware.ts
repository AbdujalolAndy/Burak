import { NextFunction, Request, Response } from "express";
import { T } from "../types/common";
import multer from "multer";
import {v4} from "uuid";
import path from "path"

export function localMemberVariable(req: T, res: Response, next: NextFunction) {
    res.locals.member = req.session.member;
    next()
}

const getTargetUploader = (address: string) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./upload/${address}`)
        },
        filename: (req, file, cb) => {
            console.log(file);
            const extention = path.parse(file.originalname).ext;
            const randomName = v4() + extention
            cb(null, randomName)
        }
    })
}
export function targetUploader(address: string) {
    const storage = getTargetUploader(address);
    return multer({ storage })
}
