"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWifiInfo = void 0;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const getAllWifiInfo = () => {
    (0, child_process_1.execSync)('chcp 65001');
    const profilesInfo = (0, child_process_1.execSync)('netsh wlan show profiles').toString();
    const profileNames = profilesInfo.match(/All User Profile\s*:\s*(.*)/g).map((s) => s.split(':')[1].trim());
    if (profileNames.length === 0) {
        console.error('当前电脑没有wifi信息');
        return;
    }
    for (const name of profileNames) {
        const passwordInfo = (0, child_process_1.execSync)(`netsh wlan show profile name="${name}" key=clear`);
        const passwordMatch = passwordInfo.toString().match(/Key Content\s*:\s*(.*)/);
        const password = passwordMatch ? passwordMatch[1].trim() : '无密码';
        console.log(`    ${chalk_1.default.greenBright(name)} : ${chalk_1.default.yellowBright(password)}`);
    }
    process.exit();
};
exports.getAllWifiInfo = getAllWifiInfo;
