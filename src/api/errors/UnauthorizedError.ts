import * as errors from "../../errors/index.js";
import * as core from "../../core/index.js";

export class UnauthorizedError extends errors.FishAudioError {
    constructor(body?: unknown, rawResponse?: core.RawResponse) {
        super({
            message: "UnauthorizedError",
            statusCode: 401,
            body: body,
            ...(rawResponse != null ? { rawResponse } : {}),
        });
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
