"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const https_1 = require("../utils/https");
const fileEditing_1 = require("../utils/fileEditing");
const init = async () => {
    const data = await (0, fileEditing_1.readFile)();
    var rule = new node_schedule_1.default.RecurrenceRule();
    rule.dayOfWeek = [0, new node_schedule_1.default.Range(1, 6)];
    rule.hour = +data.hour || 8;
    rule.minute = +data.minute || 0;
    console.log(rule);
    node_schedule_1.default.scheduleJob(rule, () => {
        (0, https_1.signInApi)(data);
        console.log(new Date().toString());
    });
};
init();
