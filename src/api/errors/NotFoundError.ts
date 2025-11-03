import * as errors from "../../errors/index.js";
import * as core from "../../core/index.js";

export class NotFoundError extends errors.FishAudioError {
    constructor(body?: unknown, rawResponse?: core.RawResponse) {
        super({
            message: "NotFoundError",
            statusCode: 404,
            body: body,
            ...(rawResponse != null ? { rawResponse } : {}),
        });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
