export class FishAudioTimeoutError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, FishAudioTimeoutError.prototype);
    }
}
