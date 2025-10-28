export class HttpCodeError extends Error {
    public readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "HttpCodeError";
        this.status = status;
    }
}
