/**
 * 计算两个经纬度之间的距离
 * @param lat1 第一个点的纬度
 * @param lon1 第一个点的经度
 * @param lat2 第二个点的纬度
 * @param lon2 第二个点的经度
 * @returns 中心点经纬度和距离
 */
export function distanceLngLat(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { centerLonLat: [number, number]; distance: number } {
  const radLat1 = rad(lat1)
  const radLat2 = rad(lat2)
  const a = radLat1 - radLat2
  const b = rad(lon1) - rad(lon2)
  const s =
    2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  const earthRadius = 6378137.0 // WGS84标准参考椭球中的地球长半径(单位:m)
  const distance = s * earthRadius
  const centerLonLat = getCenterLonLat(lon1, lat1, lon2, lat2)
  return { centerLonLat, distance: Math.round(distance * 10000) / 10000 }
}

/**
 * 将角度转换为弧度
 * @param degrees 角度
 * @returns 弧度
 */
function rad(degrees: number): number {
  return (degrees * Math.PI) / 180.0
}

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
export const getCenterLonLat = (oneLon: number, oneLat: number, twoLon: number, twoLat: number): [number, number] => {
  //oneLon：第一个点的经度；oneLat：第一个点的纬度；twoLon：第二个点的经度；twoLat：第二个点的纬度；
  let aLon = 0,
    aLat = 0
  const bLon = Number(oneLon) - Number(twoLon)
  const bLat = Number(oneLat) - Number(twoLat)
  //Math.abs()绝对值
  if (bLon > 0) {
    aLon = Number(oneLon) - Math.abs(bLon) / 2
  } else {
    aLon = Number(twoLon) - Math.abs(bLon) / 2
  }
  if (bLat > 0) {
    aLat = Number(oneLat) - Math.abs(bLat) / 2
  } else {
    aLat = Number(twoLat) - Math.abs(bLat) / 2
  }
  return [aLon, aLat]
}
