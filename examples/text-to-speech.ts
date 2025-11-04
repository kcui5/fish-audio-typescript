//Basic TTS
// Set these variables to run:
const apiKey = "your_api_key";
const referenceId = "reference_id";
const fileName = "file_name.mp3";
const filePath = "path/to/your/audio/file.mp3";



import { FishAudioClient, play } from "../dist/esm/index.js";

const fishAudio = new FishAudioClient({ apiKey: apiKey });

const ttsRequest1 = { text: "Hello, world!" };
const audio1 = await fishAudio.textToSpeech.convert(ttsRequest1); //defaults to model = "s1"

await play(audio1);



import type { TTSRequest } from "../dist/esm/index.js";

const ttsRequest2: TTSRequest = {
    text: "Hello, world!",
    reference_id: referenceId,
};
const audio2 = await fishAudio.textToSpeech.convert(ttsRequest2); //defaults to model = "s1"

await play(audio2);



import type { ReferenceAudio } from "../dist/esm/index.js";
import { readFile } from "fs/promises";

const audioBuffer = await readFile(filePath);
const referenceFile = new File([audioBuffer], fileName);

const referenceAudio: ReferenceAudio = {
    audio: referenceFile,
    text: "reference audio text"
};

const ttsRequest3: TTSRequest = {
    text: "Hello, world!",
    references: [referenceAudio]
};

const audio3 = await fishAudio.textToSpeech.convert(ttsRequest3);
await play(audio3);
