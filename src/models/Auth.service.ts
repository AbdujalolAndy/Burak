import { AUTH_DURATION } from "../libs/config";
import { Member } from "../libs/types/member.type";
import jwt from "jsonwebtoken";
import Errors, { Message } from "../libs/Error";
import { HttpCode } from "../libs/Error";

class AuthService {
    private readonly secret: string;
    constructor() {
        this.secret = String(process.env.SECRET_TOKEN) as string;
    }

    public async createToken(payload: Member) {
        const duration = `${AUTH_DURATION}h` as string;
        return new Promise((resolve, reject) => {
            jwt.sign(
                {payload},
                this.secret,
                { expiresIn: duration },
                (error, token) => {
                    if (error) {
                        console.log(error)
                        reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED))
                    } else {
                        resolve(token)
                    }
                }
            )
        })
    }
}

export default AuthService;