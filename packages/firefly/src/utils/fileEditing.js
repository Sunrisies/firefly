"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.writeFile = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const fileName = '.config.json';
const userDir = process.env.USERPROFILE || process.env.HOME;
const filePath = node_path_1.default.join(userDir, fileName);
const writeFile = (configString) => {
    try {
        node_fs_1.default.writeFile(filePath, configString, 'utf8', (err) => {
            if (err) {
                console.error('写入文件时发生错误:', err);
                return;
            }
        });
    }
    catch (err) {
        console.error('写入文件时发生错误:', err);
    }
};
exports.writeFile = writeFile;
const readFile = () => {
    return new Promise((resolve, reject) => {
        try {
            node_fs_1.default.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.readFile = readFile;
