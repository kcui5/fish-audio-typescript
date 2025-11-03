export const FishAudioEnvironment = {
    Production: "https://api.fish.audio",
} as const;

export type FishAudioEnvironment = typeof FishAudioEnvironment.Production;
