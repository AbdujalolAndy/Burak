import MemberModel from "../schema/Member.model";
import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import bcryptjs from "bcryptjs"
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member.type";
import { shapeIntoMongodbObject } from "../libs/config";

class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel
    }

    //SPA
    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcryptjs.genSalt();
        input.memberPassword = await bcryptjs.hash(input.memberPassword, salt);

        try {
            const member = await this.memberModel.create(input);
            member.memberPassword = "";
            return member
        } catch (err: any) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.CREATE_FAILED)
        }
    }

    public async login(input: LoginInput): Promise<Member> {
        const exist = await this.memberModel
            .findOne({ memberNick: input.memberNick }, { _id: 1, memberPassword: 1, memberNick: 1 })
            .exec()

        if (!exist) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK)
        }
        try {
            const isMatch: boolean = await bcryptjs.compare(input.memberPassword, exist.memberPassword);

            if (!isMatch) {
                throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
            }
            return await this.memberModel.findById({ _id: exist._id }).exec()
        } catch (err: any) {
            throw err
        }
    }

    //SSR
    public async getAllUsers(): Promise<Member[]> {
        try {
            const members = await this.memberModel.find({ memberType: MemberType.USER }).exec();
            if (!members.length) new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
            return members
        } catch (err: any) {
            throw err
        }
    }

    public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
        try {
            const memberId = shapeIntoMongodbObject(input._id);
            const editedUser = await this.memberModel.findByIdAndUpdate(memberId, input, { new: true }).exec();
            if (!editedUser) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
            return editedUser
        } catch (err: any) {
            throw err
        }
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const existData = await this.memberModel
            .findOne({ memberType: MemberType.RESTAURANT })
            .exec();
        if (existData) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
        try {
            const salt = await bcryptjs.genSalt();
            input.memberPassword = await bcryptjs.hash(input.memberPassword, salt);
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result
        } catch (err: any) {
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
            const isMatch = await bcryptjs.compare(input.memberPassword, existMember.memberPassword);
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