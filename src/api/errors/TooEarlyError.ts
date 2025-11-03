import * as errors from "../../errors/index.js";
import * as core from "../../core/index.js";

export class TooEarlyError extends errors.FishAudioError {
    constructor(body?: unknown, rawResponse?: core.RawResponse) {
        super({
            message: "TooEarlyError",
            statusCode: 425,
            body: body,
            ...(rawResponse != null ? { rawResponse } : {}),
        });
        Object.setPrototypeOf(this, TooEarlyError.prototype);
    }
}
