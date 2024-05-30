"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTemp = exports.checkPath = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const ora_1 = __importDefault(require("ora"));
const spinner = (0, ora_1.default)('下载中...');
const checkPath = (path) => {
    return node_fs_1.default.existsSync(path);
};
exports.checkPath = checkPath;
const downloadTemp = (branch, project) => {
    spinner.start();
    return new Promise((resolve, reject) => {
        (0, download_git_repo_1.default)(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, project, { clone: true }, function (err) {
            if (err) {
                reject(err);
                console.log(err);
            }
            resolve('下载完成');
            spinner.succeed('下载完成');
        });
    });
};
exports.downloadTemp = downloadTemp;
