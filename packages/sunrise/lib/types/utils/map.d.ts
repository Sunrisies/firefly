/**
 * 计算两个经纬度之间的距离
 * @param lat1 第一个点的纬度
 * @param lon1 第一个点的经度
 * @param lat2 第二个点的纬度
 * @param lon2 第二个点的经度
 * @returns 中心点经纬度和距离
 */
export declare function distanceLngLat(lat1: number, lon1: number, lat2: number, lon2: number): {
    centerLonLat: [number, number];
    distance: number;
};
/**
 * @Date: 2023-12-23 15:53:19
 * @Author: 小朱
 * @function: 计算两个经纬度之间的中心经纬度
 * @Param:
 * @return {[number,number]} 中心的经纬度
 * @param {number} oneLon 第一个点的经度
 * @param {number} oneLat 第一个点的纬度
 * @param {number} twoLon 第二个点的经度
 * @param {number} twoLat 第二个点的纬度
 */
export declare const getCenterLonLat: (oneLon: number, oneLat: number, twoLon: number, twoLat: number) => [number, number];
