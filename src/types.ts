// export type Backends = "speech-1.5" | "speech-1.6" | "agent-x0" | "s1" | "s1-mini";

// export interface PaginatedResponse<Item> {
//     total: number;
//     items: Item[];
// }

// export interface ReferenceAudio {
//     audio: Uint8Array | ArrayBuffer | Buffer;
//     text: string;
// }

// export interface Prosody {
//     speed?: number; // default 1.0
//     volume?: number; // default 0.0
// }

// export interface TTSRequest {
//     text: string;
//     chunk_length?: number; // 100..300, default 200
//     format?: "wav" | "pcm" | "mp3" | "opus"; // default mp3
//     sample_rate?: number | null;
//     mp3_bitrate?: 64 | 128 | 192; // default 128
//     opus_bitrate?: -1000 | 24 | 32 | 48 | 64; // default 32
//     references?: ReferenceAudio[];
//     reference_id?: string | null;
//     normalize?: boolean; // default true
//     latency?: "normal" | "balanced"; // default balanced
//     prosody?: Prosody | null;
//     top_p?: number; // default 0.7
//     temperature?: number; // default 0.7
// }

// export interface ASRRequest {
//     audio: Uint8Array | ArrayBuffer | Buffer;
//     language?: string | null;
//     ignore_timestamps?: boolean | null;
// }

// export interface ASRSegment {
//     text: string;
//     start: number;
//     end: number;
// }

// export interface ASRResponse {
//     text: string;
//     // Duration in milliseconds
//     duration: number;
//     segments: ASRSegment[];
// }

// export interface SampleEntity {
//     title: string;
//     text: string;
//     task_id: string;
//     audio: string;
// }

// export interface AuthorEntity {
//     id: string; // maps from _id
//     nickname: string;
//     avatar: string;
// }

// export interface ModelEntity {
//     id: string; // maps from _id
//     type: "svc" | "tts";
//     title: string;
//     description: string;
//     cover_image: string;
//     train_mode: "fast" | "full";
//     state: "created" | "training" | "trained" | "failed";
//     tags: string[];
//     samples: SampleEntity[];
//     created_at: string; // ISO datetime
//     updated_at: string; // ISO datetime
//     languages: string[];
//     visibility: "public" | "unlist" | "private";
//     lock_visibility: boolean;

//     like_count: number;
//     mark_count: number;
//     shared_count: number;
//     task_count: number;

//     liked: boolean;
//     marked: boolean;

//     author: AuthorEntity;
// }

export interface APICreditEntity {
    _id: string;
    user_id: string;
    credit: string;
    created_at: string;
    updated_at: string;
    has_phone_sha256: boolean;
    has_free_credit: boolean | null;
}

// export interface PackageEntity {
//     _id: string;
//     user_id: string;
//     type: string;
//     total: number;
//     balance: number;
//     created_at: string;
//     updated_at: string;
//     finished_at: string;
// }

// // Request params for model queries
// export interface ModelListParams {
//   pageSize?: number;
//   pageNumber?: number;
//   title?: string;
//   tag?: string | string[];
//   self?: boolean; // corresponds to "self" query param
//   authorId?: string;
//   language?: string | string[];
//   titleLanguage?: string | string[];
//   sortBy?: "task_count" | "created_at";
// }

// export interface ModelCreateParams {
//   visibility?: "public" | "unlist" | "private"; // default private
//   type?: "tts"; // currently only tts in python
//   title: string;
//   description?: string;
//   coverImage?: Uint8Array | ArrayBuffer | Buffer;
//   trainMode?: "fast"; // python default fast
//   voices: (Uint8Array | ArrayBuffer | Buffer)[];
//   texts?: string[];
//   tags?: string[];
//   enhanceAudioQuality?: boolean; // default true
// }

// export interface ModelUpdateParams {
//   title?: string;
//   description?: string;
//   coverImage?: Uint8Array | ArrayBuffer | Buffer;
//   visibility?: "public" | "unlist" | "private";
//   tags?: string[];
// }

// export interface ApiCreditParams {
//   // Compatibility with community SDK; optional feature gate
//   checkFreeCredit?: boolean;
// }


