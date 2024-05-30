import { add } from '../common/index';
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
                height: contentHeight,
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
console.log(11111111111111111);
export default {
    add: add,
    getContentDimensions: getContentDimensions
};
