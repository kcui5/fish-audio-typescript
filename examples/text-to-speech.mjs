import { FishAudioClient, play } from "../dist/esm/index.js";

const fishAudio = new FishAudioClient({ apiKey: "your_api_key" });

const ttsRequestOptions = { text: "Hello, world!" };
const audio = await fishAudio.textToSpeech.convert(ttsRequestOptions); //defaults to model = "s1"

await play(audio);
