import * as errors from "../../errors/index.js";
import * as core from "../../core/index.js";

export type ValidationErrorLocItem = string | number;

export interface ValidationError {
    loc: ValidationErrorLocItem[];
    msg: string;
    type: string;
}

export interface HttpValidationError {
    detail?: ValidationError[];
}

export class UnprocessableEntityError extends errors.FishAudioError {
    constructor(body: HttpValidationError, rawResponse?: core.RawResponse) {
        super({
            message: "UnprocessableEntityError",
            statusCode: 422,
            body: body,
            ...(rawResponse != null ? { rawResponse } : {}),
        });
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}
