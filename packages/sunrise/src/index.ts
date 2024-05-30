import { getContentDimensions, preloadAndCacheImages, conversionTime ,genRandStr} from './utils/index'
export { getContentDimensions, preloadAndCacheImages, conversionTime ,genRandStr}

/*
 * add function 计算两个数的和
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const add = (a: number, b: number): number => a + b
export default {
  getContentDimensions: getContentDimensions,
  add
}
