import { FishAudioClient } from "../dist/esm/index.js";
import { createReadStream } from "fs";

async function main() {
    const title = "audio";

    const fishAudio = new FishAudioClient();

    const audioFile = createReadStream(new URL("./audio.mp3", import.meta.url));

    try {
        const response = await fishAudio.voices.ivc.create({
            title: title,
            voices: [audioFile],
            cover_image: createReadStream(new URL("./cover image.png", import.meta.url)),
        });

        console.log("Voice created:", {
            id: response._id,
            title: response.title,
            state: response.state,
        });
    } catch (err) {
        console.error("Create voice request failed:", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
