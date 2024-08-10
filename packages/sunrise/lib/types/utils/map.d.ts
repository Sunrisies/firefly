export declare function distanceLngLat(lat1: number, lon1: number, lat2: number, lon2: number): {
    centerLonLat: [number, number];
    distance: number;
};
export declare const getCenterLonLat: (oneLon: number, oneLat: number, twoLon: number, twoLat: number) => [number, number];
