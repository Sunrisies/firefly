export declare const getContentDimensions: (elementId: string) => null | {
    width: number;
    height: number;
};
export declare const preloadAndCacheImages: (imageUrls: string[]) => Promise<HTMLImageElement[]>;
export declare const preloadAndCacheImage: (imageUrl: string) => void;
export declare const conversionTime: (time: number) => string;
export declare const genRandStr: (length: number) => string;
