/**
 * 获取指定元素ID的内容区域（排除内边距padding）的尺寸。
 *
 * @param elementId 要获取尺寸的元素的类名（注意：这里应该是类名，而不是ID）。
 * @returns 返回一个包含width和height的对象，如果找不到元素或无法获取计算样式则返回null。
 */
export const getContentDimensions = (elementId: string): null | { width: number; height: number } => {
  const element = document.getElementsByClassName(elementId)[0]
  if (element) {
    const rect = element.getBoundingClientRect()
    if (window.getComputedStyle(element)) {
      const style = window.getComputedStyle(element)
      const paddingTop = parseFloat(style.paddingTop)
      const paddingRight = parseFloat(style.paddingRight)
      const paddingBottom = parseFloat(style.paddingBottom)
      const paddingLeft = parseFloat(style.paddingLeft)
      const contentWidth = rect.width - (paddingLeft + paddingRight)
      const contentHeight = rect.height - (paddingTop + paddingBottom)

      return {
        width: contentWidth,
        height: contentHeight
      }
    } else {
      console.error('Element has no computed style:', elementId)
      return null
    }
  } else {
    console.error('Element not found with ID:', elementId)
    return null
  }
}

/**
 * 预加载并缓存一组图片资源。
 * @param imageUrls 图片资源的URL数组
 * @returns 返回一个Promise，该Promise在所有图片加载完成后解析为一个包含HTMLImageElement对象的数组
 */
export const preloadAndCacheImages = (imageUrls: string[]): Promise<HTMLImageElement[]> => {
  return Promise.all(
    imageUrls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve) => {
          const image = new Image()
          image.onload = () => resolve(image)
          image.src = url
        })
    )
  )
}
/**
 * 预加载并缓存图片资源。
 * @param imageUrl 图片资源的URL
 * @returns 返回一个Promise，该Promise在图片加载完成后解析为一个包含HTMLImageElement对象
 */
export const preloadAndCacheImage = (imageUrl: string) => {
    const img = new Image();
  img.onload = () => img;
  console.log(img,'=1==1=1=1=1=1=');
    img.src = imageUrl;
};


/**
 * 时间戳转换为日期字符串。
 * @param time 时间戳
 * @returns 返回日期字符串
 */
export const conversionTime = (time: number): string => {
  const date = new Date(time * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${year}年${month}月${day}日${hours}时${minutes}分`
}

/**
 * 随机生成指定长度的字符串。
 * @param length 字符串长度
 * @returns 返回随机字符串
 */
export const genRandStr = (length: number): string => {
  if (typeof length !== 'number' || length <= 0) {
    console.error('Length must be a positive number')
    return
  }

  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString: string = ''
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }
  return randomString
}
