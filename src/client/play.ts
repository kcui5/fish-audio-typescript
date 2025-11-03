import { FishAudioError } from "../errors/FishAudioError.js";
import { isNode } from "./utils.js";

export async function play(audio: AsyncIterable<Uint8Array>): Promise<void> {
    if (!isNode()) {
        throw new FishAudioError({
            message: "The play function is only available in a Node.js environment.",
        });
    }

    const { spawn } = require("node:child_process");
    const { Readable } = require("node:stream");
    const commandExists = require("command-exists");

    if (!commandExists.sync("ffplay")) {
        throw new FishAudioError({
            message: `ffplay from ffmpeg not found, necessary to play audio.
            On mac you can install it with 'brew install ffmpeg'.
            On linux and windows you can install it from https://ffmpeg.org/`,
        });
    }

    const ffplay = spawn("ffplay", ["-autoexit", "-", "-nodisp"], {
        stdio: ["pipe", "ignore", "pipe"],
    });

    Readable.from(audio).pipe(ffplay.stdin);

    const errorChunks: Buffer[] = [];
    ffplay.stderr.on("data", (chunk: Buffer) => {
        errorChunks.push(chunk);
    });

    return new Promise<void>((resolve, reject) => {
        ffplay.on("close", (code: number) => {
            if (code === 0) {
                resolve();
            } else {
                const error = Buffer.concat(errorChunks).toString();
                reject(
                    new FishAudioError({
                        message: `ffplay exited with code ${code}. Stderr: ${error}`,
                    }),
                );
            }
        });
        ffplay.on("error", (err: Error) => {
            reject(new FishAudioError({ message: `Failed to start ffplay: ${err.message}` }));
        });
    });
}
