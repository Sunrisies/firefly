/**
 * 获取指定元素ID的内容区域（排除内边距padding）的尺寸。
 *
 * @param elementId 要获取尺寸的元素的类名（注意：这里应该是类名，而不是ID）。
 * @returns 返回一个包含width和height的对象，如果找不到元素或无法获取计算样式则返回null。
 */
export declare const getContentDimensions: (elementId: string) => null | {
    width: number;
    height: number;
};
/**
 * 预加载并缓存一组图片资源。
 * @param imageUrls 图片资源的URL数组
 * @returns 返回一个Promise，该Promise在所有图片加载完成后解析为一个包含HTMLImageElement对象的数组
 */
export declare const preloadAndCacheImages: (imageUrls: string[]) => Promise<HTMLImageElement[]>;
/**
 * 预加载并缓存图片资源。
 * @param imageUrl 图片资源的URL
 * @returns 返回一个Promise，该Promise在图片加载完成后解析为一个包含HTMLImageElement对象
 */
export declare const preloadAndCacheImage: (imageUrl: string) => void;
/**
 * 时间戳转换为日期字符串。
 * @param time 时间戳
 * @returns 返回日期字符串
 */
export declare const conversionTime: (time: number) => string;
/**
 * 随机生成指定长度的字符串。
 * @param length 字符串长度
 * @returns 返回随机字符串
 */
export declare const genRandStr: (length: number) => string;
