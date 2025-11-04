export interface UpdateModelRequestOptions {
    title?: string;
    description?: string;
    cover_image?: File;
    visibility?: "public" | "unlist" | "private";
    tags?: string[];
}
