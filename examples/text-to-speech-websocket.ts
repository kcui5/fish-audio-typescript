// TTS WebSocket
// Set these variables to run:
const apiKey = "your_api_key";
const referenceId = "";

import { FishAudioClient, RealtimeEvents } from "fish-audio";
import { writeFile } from "fs/promises";
import path from "path";

// Simple async generator that yields text chunks to speak
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

const client = new FishAudioClient({ apiKey: apiKey });

// For realtime, set text to "" and stream the content via textStream instead
const request = {
    text: "",
    reference_id: referenceId,
};

const connection = await client.textToSpeech.convertRealtime(request, makeTextStream());

// Collect audio and write to a file when the stream ends
const chunks: Buffer[] = [];
connection.on(RealtimeEvents.OPEN, () => console.log("WebSocket opened"));
connection.on(RealtimeEvents.AUDIO_CHUNK, (audio: unknown): void => {
    if (audio instanceof Uint8Array || Buffer.isBuffer(audio)) {
        chunks.push(Buffer.from(audio));
    }
});
connection.on(RealtimeEvents.ERROR, (err) => console.error("WebSocket error:", err));
connection.on(RealtimeEvents.CLOSE, async () => {
    const outPath = path.resolve(process.cwd(), "out.mp3");
    await writeFile(outPath, Buffer.concat(chunks));
    console.log("Saved to", outPath);
});
