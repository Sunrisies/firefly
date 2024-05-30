#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const createAppTest_1 = __importDefault(require("./utils/createAppTest"));
const selectTools_1 = require("./utils/selectTools");
const getPackageInfo_1 = __importDefault(require("./utils/getPackageInfo"));
commander_1.program.version(chalk_1.default.greenBright((0, getPackageInfo_1.default)(process.env.NODE_ENV === 'production' ? '../package.json' : '../../package.json', true).version));
commander_1.program
    .command('create <project-name>')
    .description('为项目文件创建目录')
    .option('-f, --force', '覆盖目标目录（如果存在）')
    .action((name, options) => {
    (0, createAppTest_1.default)(name, options);
});
commander_1.program
    .command('tools')
    .description('使用工具')
    .action(() => {
    (0, selectTools_1.selectTools)();
});
commander_1.program.parse(process.argv);
