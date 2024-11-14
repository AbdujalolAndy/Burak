import MemberModel from "../schema/Member.model";
import Errors, { HttpCode, Message } from "../libs/Error";
import { Member, MemberInput } from "../libs/types/member/member.type";
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
}

export default MemberService