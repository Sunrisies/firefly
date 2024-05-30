"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTools = void 0;
const prompts_1 = require("@clack/prompts");
const index_1 = require("../wifi/index");
const index_2 = require("../signIn/index");
const index_3 = require("../getNpmSource/index");
const selectTools = async () => {
    const value = (await (0, prompts_1.select)({
        message: '请选择一个工具',
        options: [
            { value: 'wifi', label: 'wifi' },
            { value: '掘金签到', label: '掘金签到' },
            { value: '检测当前npm源', label: '检测当前npm源' }
        ]
    }));
    switch (value) {
        case 'wifi':
            (0, index_1.wifi)();
            break;
        case '掘金签到':
            (0, index_2.signIn)();
            break;
        case '检测当前npm源':
            (0, index_3.getNpmSourceInfo)();
            break;
    }
};
exports.selectTools = selectTools;
