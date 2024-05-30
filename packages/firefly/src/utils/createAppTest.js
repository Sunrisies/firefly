"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const prompts_1 = require("@clack/prompts");
const ora_1 = __importDefault(require("ora"));
const spinner = (0, ora_1.default)('下载中...');
const utils_1 = require("./utils");
const fileController_1 = require("./fileController");
const select_1 = require("./select");
process.stdin.setRawMode(true);
process.stdin.on('data', (key) => {
    if (key[0] === 3) {
        console.log('⌨️  Ctrl+C pressed - Exiting the program');
        process.exit(1);
    }
});
async function createFolder(rootDirectory, options) {
    if (fs_extra_1.default.existsSync(rootDirectory)) {
        let proceed = options.force;
        if (!proceed) {
            proceed = await (0, prompts_1.confirm)({
                message: 'Whether to overwrite a file with the same name that exists in the current directory?'
            });
        }
        if (proceed) {
            (0, fileController_1.removeDirectory)(rootDirectory, false);
        }
        else {
            process.exit(1);
        }
    }
    fs_extra_1.default.mkdirSync(rootDirectory, { recursive: true });
}
async function createAppTest(projectName, options) {
    const preset = await (0, select_1.projectSelect)();
    console.log(preset, 'preset');
    if (preset.isTs) {
        (0, utils_1.downloadTemp)('ts', projectName);
    }
    else {
        (0, utils_1.downloadTemp)('js', projectName);
    }
}
exports.default = createAppTest;
