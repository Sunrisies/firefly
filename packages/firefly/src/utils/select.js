"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSelect = void 0;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
async function projectSelect() {
    const responses = {
        isTs: false,
        packageManager: '',
        npmSource: ''
    };
    (0, prompts_1.intro)(chalk_1.default.green(' create-you-app '));
    responses.isTs = (await (0, prompts_1.confirm)({
        message: '是否支持typeScript?'
    }));
    return { ...responses };
}
exports.projectSelect = projectSelect;
