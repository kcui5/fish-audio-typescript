export const FishAudioEnvironment = {
    Production: "https://api.fishaudio.io",
} as const;

export type FishAudioEnvironment = typeof FishAudioEnvironment.Production;
