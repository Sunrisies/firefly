"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wifi = void 0;
const prompts_1 = require("@clack/prompts");
const getAllWifiInfo_1 = require("../utils/getAllWifiInfo");
const wifi = async () => {
    const value = (await (0, prompts_1.select)({
        message: '请选择要进行的操作：',
        options: [
            { value: '获取连接过的WiFi信息', label: '获取连接过的WiFi信息' },
        ]
    }));
    switch (value) {
        case "获取连接过的WiFi信息":
            (0, getAllWifiInfo_1.getAllWifiInfo)();
            break;
    }
};
exports.wifi = wifi;
