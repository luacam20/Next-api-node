export class AppError {
    public readonly massage: string;

    public readonly statusCode: number;

    constructor(massage: string, statusCode: number = 400) {
        this.massage = massage;
        this.statusCode = statusCode;
    }
}