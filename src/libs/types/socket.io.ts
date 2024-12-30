import { Member } from "./member.type";

export interface MessagePayload {
    event: string;
    text: string;
    memberData: Member;
    action: string
}

export interface InfoPayload {
    event: string;
    totalClients: number;
    memberData: Member | null
    action: string
}

export interface MessagesPayload {
    event: string;
    list: MessagePayload[];
}