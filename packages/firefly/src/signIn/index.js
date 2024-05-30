"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const https_1 = require("../utils/https");
const fileEditing_1 = require("../utils/fileEditing");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const fileName = '.config.json';
const userDir = process.env.USERPROFILE || process.env.HOME;
const filePath = node_path_1.default.join(userDir, fileName);
const pm2_1 = require("../utils/pm2");
const signIn = async () => {
    let params = {
        cookie: '',
        aid: '',
        uid: '',
        hour: '',
        minute: ''
    };
    if (node_fs_1.default.existsSync(filePath)) {
        const value = (await (0, prompts_1.confirm)({
            message: '读到本地有配置文件，是否重置?'
        }));
        if (!value) {
            SelectCheckIn();
            return;
        }
        params.cookie = (await (0, prompts_1.text)({
            message: '请输入你的cookie',
            placeholder: 'Not cookie',
            validate(value) {
                if (value.length === 0)
                    return `Value is required!`;
            }
        }));
        params.aid = (await (0, prompts_1.text)({
            message: '请输入你的aid',
            placeholder: 'Not aid',
            validate(value) {
                if (value.length === 0)
                    return `Value is required!`;
            }
        }));
        params.uid = (await (0, prompts_1.text)({
            message: '请输入你的uid',
            placeholder: 'Not uid',
            validate(value) {
                if (value.length === 0)
                    return `Value is required!`;
            }
        }));
        params.hour = (await (0, prompts_1.text)({
            message: `${chalk_1.default.yellowBright('?')}  请输入你的定时的小时   ${chalk_1.default.yellowBright('选填')}`,
            placeholder: 'Not hour'
        }));
        params.minute = (await (0, prompts_1.text)({
            message: '请输入你的定时分钟(选填)',
            placeholder: 'Not minute'
        }));
        const configData = {
            hour: params.hour,
            minute: params.minute,
            cookie: `sessionid=${params.cookie}`,
            url: 'https://juejin.cn/',
            check_url: `https://api.juejin.cn/growth_api/v1/check_in?aid=${params.aid}&uid=${params.uid}`
        };
        const configString = `${JSON.stringify(configData, null, 2)}`;
        (0, fileEditing_1.writeFile)(configString);
        SelectCheckIn();
    }
};
exports.signIn = signIn;
const SelectCheckIn = async () => {
    const value = (await (0, prompts_1.select)({
        message: '手动签到或自动签到?',
        options: [
            { value: '手动签到', label: '手动签到' },
            { value: '自动签到', label: '自动签到' }
        ]
    }));
    const file = await (0, fileEditing_1.readFile)();
    switch (value) {
        case '手动签到':
            (0, https_1.signInApi)(file);
            break;
        case '自动签到':
            (0, pm2_1.managePm2)();
            break;
    }
};
