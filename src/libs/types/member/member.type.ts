import { ObjectId, Document } from "mongoose";
import { MemberStatus } from "../../enums/member.enum";
import { MemberType } from "../../enums/member.enum";

export interface MemberInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string
}

export interface Member {
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginInput{
    memberNick:string,
    memberPassword:string
}