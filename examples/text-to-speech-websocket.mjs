import { FishAudioClient, RealtimeEvents, play } from "../dist/esm/index.js";

async function* makeTextStream() {
    const chunks = [
        "Hello from Fish Audio! ",
        "This is a realtime text-to-speech test. ",
        "We are streaming multiple chunks over WebSocket.",
    ];
    for (const chunk of chunks) {
        yield chunk;
        await new Promise((r) => setTimeout(r, 200));
    }
}

async function main() {
    const fishAudio = new FishAudioClient();

    const request = {
        text: "",
        format: "mp3",
        sample_rate: 44100,
        latency: "balanced",
    };

    const textStream = makeTextStream();

    const connection = await fishAudio.textToSpeech.convertRealtime(request, textStream);

    let totalBytes = 0;
    let chunkCount = 0;

    // Minimal push-based AsyncIterable so `play()` can consume progressively
    function createPushAsyncIterable() {
        const queue = [];
        let notify = null;
        let done = false;
        let failed = null;
        return {
            push(chunk) {
                if (done || failed) return;
                queue.push(chunk);
                if (notify) {
                    const n = notify;
                    notify = null;
                    n();
                }
            },
            end() {
                done = true;
                if (notify) {
                    const n = notify;
                    notify = null;
                    n();
                }
            },
            error(err) {
                failed = err;
                if (notify) {
                    const n = notify;
                    notify = null;
                    n();
                }
            },
            async *iterator() {
                while (true) {
                    if (failed) throw failed;
                    if (queue.length) {
                        yield queue.shift();
                        continue;
                    }
                    if (done) return;
                    await new Promise((r) => (notify = r));
                }
            },
        };
    }

    const audioOut = createPushAsyncIterable();

    const done = new Promise((resolve, reject) => {
        connection.on(RealtimeEvents.OPEN, () => {
            console.log("[WS] open");
        });

        connection.on(RealtimeEvents.AUDIO_CHUNK, (audio) => {
            const size = audio?.length ?? 0;
            totalBytes += size;
            chunkCount += 1;
            console.log(`[WS] received ${chunkCount} chunks, total ${totalBytes} bytes`);
            try {
                audioOut.push(Buffer.from(audio));
            } catch (e) {
                console.warn("[WS] failed to queue audio chunk:", e);
            }
        });

        connection.on(RealtimeEvents.ERROR, (err) => {
            console.error("[WS] error:", err);
            try {
                audioOut.error(err);
            } finally {
                reject(err);
            }
        });

        connection.on(RealtimeEvents.CLOSE, () => {
            console.log(`[WS] close — received ${chunkCount} chunks, total ${totalBytes} bytes`);
            try {
                audioOut.end();
            } finally {
                resolve();
            }
        });
    });

    // Safety timeout to avoid hanging forever in case of server/network issues
    const timeout = setTimeout(() => {
        try {
            console.warn("[WS] timeout — closing connection");
            connection.close();
        } catch {}
    }, 30000);

    try {
        const playPromise = play(audioOut.iterator());
        await done;
        await playPromise;
    } finally {
        clearTimeout(timeout);
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
