import { FishAudioClient, play } from "../dist/esm/index.js";
import { Readable } from "stream";

async function main() {
    const fishAudio = new FishAudioClient();

    const model = "s1";

    const request = {
        text: "Hello from Fish Audio! This is a TTS test.",
        format: "mp3",
        sample_rate: 44100,
        latency: "balanced",
    };

    try {
        const audio = await fishAudio.textToSpeech.convert(model, request);
        const reader = audio.getReader();
        const stream = new Readable({
            async read() {
                const { done, value } = await reader.read();
                if (done) {
                    this.push(null);
                } else {
                    this.push(value);
                }
            },
        });
        await play(stream);
    } catch (err) {
        console.error("TTS request failed:", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
