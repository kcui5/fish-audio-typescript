import { FishAudioClient } from "../dist/esm/index.js";

async function main() {
    const fishAudio = new FishAudioClient();

    try {
        const credits = await fishAudio.user.get_api_credit();
        console.log("API Credits:", credits);

        const pkg = await fishAudio.user.get_package();
        console.log("Package:", pkg);
    } catch (err) {
        console.error("User info request failed:", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
