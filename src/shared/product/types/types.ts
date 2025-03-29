export interface UnsplashPhoto {
    id?: string;
    urls: {
        small: string; regular: string;
    };
    description: string | null;
    alt_description: string | null;
    user: {
        name: string;
    };
    isLiked?: boolean;
}