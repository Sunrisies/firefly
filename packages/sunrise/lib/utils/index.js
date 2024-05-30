export const getContentDimensions = (elementId) => {
    const element = document.getElementsByClassName(elementId)[0];
    if (element) {
        const rect = element.getBoundingClientRect();
        if (window.getComputedStyle(element)) {
            const style = window.getComputedStyle(element);
            const paddingTop = parseFloat(style.paddingTop);
            const paddingRight = parseFloat(style.paddingRight);
            const paddingBottom = parseFloat(style.paddingBottom);
            const paddingLeft = parseFloat(style.paddingLeft);
            const contentWidth = rect.width - (paddingLeft + paddingRight);
            const contentHeight = rect.height - (paddingTop + paddingBottom);
            return {
                width: contentWidth,
                height: contentHeight
            };
        }
        else {
            console.error('Element has no computed style:', elementId);
            return null;
        }
    }
    else {
        console.error('Element not found with ID:', elementId);
        return null;
    }
};
export const preloadAndCacheImages = (imageUrls) => {
    return Promise.all(imageUrls.map((url) => new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = url;
    })));
};
export const conversionTime = (time) => {
    const date = new Date(time * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}年${month}月${day}日${hours}时${minutes}分`;
};
export const genRandStr = (length) => {
    if (typeof length !== 'number' || length <= 0) {
        console.error('Length must be a positive number');
        return;
    }
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
};
