import MemberModel from "../schema/Member.model";
import Errors, { HttpCode, Message } from "../libs/Error";
import { LoginInput, Member, MemberInput } from "../libs/types/member/member.type";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const existData = await this.memberModel
            .find({ memberType: MemberType.RESTAURANT })
            .exec();
        if (!existData) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }

    public async processLogin(input: LoginInput): Promise<any> {
        const existMember = await this.memberModel
            .findOne({ memberNick: input.memberNick })
            .select({ _id: 1, memberNick: 1, memberPassword: 1, memberPhone: 1 })
            .exec()
            ;
        if (!existMember) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK)
        }
        try {
            const isMatch = existMember.memberPassword === input.memberPassword;
            if (!isMatch) {
                throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
            }
            return await this.memberModel.findById({ _id: existMember._id });
        } catch (err: any) {
            throw err
        }
    }
}

export default MemberService