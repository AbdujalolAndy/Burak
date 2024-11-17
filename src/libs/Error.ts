export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    CREATE_FAILED = "Create is failed!",
    UPDATE_FAILED = "Update is failed!",
    UNAUTHORIZED = "You are not authorized user!",
    NO_DATA_FOUND = "No Data found!",

    USED_PHONE_NICK = "You are inserting already existed phone or nick!",
    NO_MEMBER_NICK = "There is no member with that nick!",
    WRONG_PASSWORD = "Wrong password inserted, please try again!"
}

class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    static standard = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG
    };

    constructor(statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code = statusCode;
        this.message = statusMessage
    }
}
export default Errors