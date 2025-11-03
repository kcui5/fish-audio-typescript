import * as errors from "../../errors/index.js";
import * as core from "../../core/index.js";

export class ForbiddenError extends errors.FishAudioError {
    constructor(body?: unknown, rawResponse?: core.RawResponse) {
        super({
            message: "ForbiddenError",
            statusCode: 403,
            body: body,
            ...(rawResponse != null ? { rawResponse } : {}),
        });
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
