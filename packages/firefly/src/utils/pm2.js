"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managePm2 = void 0;
const child_process_1 = require("child_process");
const getPackageInfo_1 = __importDefault(require("./getPackageInfo"));
const APP_PATH = './dist/signIn/http';
function stopAndDeleteProcess(id) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`pm2 stop ${id} && pm2 delete ${id}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(`进程 ${id} 已成功停止和删除。`);
            }
        });
    });
}
function startProcess(path) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`pm2 start ${path}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(`新进程已成功启动。`);
            }
        });
    });
}
async function managePm2() {
    const APP_PATH = await getNpmConfig();
    try {
        console.log(await stopAndDeleteProcess(0));
        await startProcess(APP_PATH);
    }
    catch (error) {
        console.error('管理PM2进程时发生错误:', error);
        await startProcess(APP_PATH);
    }
    process.exit();
}
exports.managePm2 = managePm2;
const getNpmConfig = () => {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)('npm root -g', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                console.error(`执行错误: ${error}`);
                return;
            }
            if (stderr) {
                reject(error);
                console.error(`标准错误输出: ${stderr}`);
                return;
            }
            const name = (0, getPackageInfo_1.default)('../../package.json', true).name.split('/');
            const pathUrl = 'C:\\Users\\hover\\Desktop\\test\\npm\\npm-cli\\packages\\firefly\\dist\\signIn\\http.js';
            resolve(pathUrl);
        });
    });
};
