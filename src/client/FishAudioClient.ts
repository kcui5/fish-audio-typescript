import * as environments from "../environments.js";
import { mergeHeaders } from "../core/headers.js";
import { Supplier } from "../core/index.js";
import * as errors from "../errors/index.js";
import { TextToSpeechWebSocketClient } from "./websocket/TextToSpeechWebSocketClient.js";

export declare namespace FishAudioClient {
    export interface Options {
        environment?: Supplier<environments.FishAudioEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        /** Override the Authorization header */
        apiKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the Authorization header */
        apiKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}

export class FishAudioClient {
    protected readonly _options: FishAudioClient.Options;
    protected _textToSpeech: TextToSpeechWebSocketClient | undefined;

    constructor(_options: FishAudioClient.Options = {}) {
        const apiKey = _options.apiKey ?? process.env.FISH_API_KEY;
        if (apiKey == null) {
            throw new errors.FishAudioError({
                message: "Please pass in your FishAudio API Key or export FISH_API_KEY in your environment.",
            });
        }
        _options.apiKey = apiKey;
        this._options = {
            ..._options,
            headers: mergeHeaders(
                {
                    "User-Agent": "fish-audio",
                },
                typeof _options?.apiKey === "string" ? { Authorization: `Bearer ${_options.apiKey}` } : {},
                _options?.headers,
            ),
        };
    }

    public get textToSpeech(): TextToSpeechWebSocketClient {
        return (this._textToSpeech ??= new TextToSpeechWebSocketClient(this._options));
    }
}
