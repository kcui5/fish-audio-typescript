import * as core from "../core/index.js";
import { toJson } from "../core/json.js";

export class FishAudioError extends Error {
    public readonly statusCode?: number | undefined;
    public readonly body?: unknown | undefined;
    public readonly rawResponse?: core.RawResponse | undefined;

    constructor({
        message,
        statusCode,
        body,
        rawResponse,
    }: {
        message?: string;
        statusCode?: number;
        body?: unknown;
        rawResponse?: core.RawResponse;
    }) {
        super(buildMessage({ message, statusCode, body }));
        Object.setPrototypeOf(this, FishAudioError.prototype);
        this.statusCode = statusCode;
        this.body = body;
        this.rawResponse = rawResponse;
    }
}

function buildMessage({
    message,
    statusCode,
    body,
}: {
    message: string | undefined;
    statusCode: number | undefined;
    body: unknown | undefined;
}): string {
    let lines: string[] = [];
    if (message != null) {
        lines.push(message);
    }

    if (statusCode != null) {
        lines.push(`Status code: ${statusCode.toString()}`);
    }

    if (body != null) {
        lines.push(`Body: ${toJson(body, undefined, 2)}`);
    }

    return lines.join("\n");
}
