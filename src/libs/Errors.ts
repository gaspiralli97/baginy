
export enum HttpCode{
    OK=200,
    CREATED =201,
    NOT_MODIFIED=304,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDIN=403,
    NOT_FOUND=404,
    INTERNAL_SERVER_ERROR=500,
    Bad_Request,
}

export enum Message {
    SOMETHING_WENT_WRONG="something went wrong",
    NO_DATA_FOUND="no data is found",
    CREATE_FAILED="create is failed",
    UPDATE_FAILED="update is failed",
    BLOCKED_USER="You have been blocked, contact seller!",
    NO_MEMBER_NICK="No member with that nick!",
    USED_NICK_PHONE="You are inserting already used nick or phone number!",
    WRONG_PASSWORD="Wrong password entered, please try again!",
    NOT_AUTHENTICATED="you are not authentiated, you first login",
    TOKEN_CREATION_FAILED="Token creation failed!",
}

class Errors extends Error {
    public code:HttpCode;
    public message:Message;

    static standard={
        code:HttpCode.INTERNAL_SERVER_ERROR,
        message:Message.SOMETHING_WENT_WRONG,
    }

    constructor(statusCode:HttpCode, statusMessage:Message) {
        super();
        this.code=statusCode;
        this.message=statusMessage;
    }
}
export default Errors;