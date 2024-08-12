declare module 'sunrise-utils/index' {
  import { getContentDimensions, preloadAndCacheImages, conversionTime, genRandStr, preloadAndCacheImage } from 'sunrise-utils/utils/index';
  import { TimeUpdater } from 'sunrise-utils/utils/timer';
  import { distanceLngLat } from 'sunrise-utils/utils/map';
  export { getContentDimensions, preloadAndCacheImages, conversionTime, genRandStr, TimeUpdater, preloadAndCacheImage, distanceLngLat };
  export type { upTimeType } from 'sunrise-utils/utils/timer';
  export const add: (a: number, b: number) => number;

}
declare module 'sunrise-utils/utils/index' {
  export const getContentDimensions: (elementId: string) => null | {
      width: number;
      height: number;
  };
  export const preloadAndCacheImages: (imageUrls: string[]) => Promise<HTMLImageElement[]>;
  export const preloadAndCacheImage: (imageUrl: string) => void;
  export const conversionTime: (time: number) => string;
  export const genRandStr: (length: number) => string;

}
declare module 'sunrise-utils/utils/map' {
  export function distanceLngLat(lat1: number, lon1: number, lat2: number, lon2: number): {
      centerLonLat: [number, number];
      distance: number;
  };
  export const getCenterLonLat: (oneLon: number, oneLat: number, twoLon: number, twoLat: number) => [number, number];

}
declare module 'sunrise-utils/utils/timer' {
  export type upTimeType = {
      formattedDate: string;
      today: string;
      nowTime: string;
  };
  export class TimeUpdater {
      #private;
      constructor();
      startUpdate(callback: (result: upTimeType) => void): void;
      stopUpdate(): void;
  }
  export const timeUpdater: TimeUpdater;

}
declare module 'sunrise-utils' {
  import main = require('sunrise-utils/src/index');
  export = main;
}