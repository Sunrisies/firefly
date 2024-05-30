"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
function getPackageJsonInfo(target, isCliPackageJson) {
    return JSON.parse((0, node_fs_1.readFileSync)(isCliPackageJson ? (0, node_path_1.join)(__dirname, target) : target).toString());
}
exports.default = getPackageJsonInfo;
