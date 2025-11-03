import * as errors from "../../errors/index.js";
import * as core from "../../core/index.js";

export interface BadRequestErrorBody {
    error?: string;
    message?: string;
}

export class BadRequestError extends errors.FishAudioError {
    constructor(body: BadRequestErrorBody, rawResponse?: core.RawResponse) {
        super({
            message: "BadRequestError",
            statusCode: 400,
            body: body,
            ...(rawResponse != null ? { rawResponse } : {}),
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
