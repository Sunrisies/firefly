"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInApi = void 0;
const request_1 = __importDefault(require("request"));
const signInApi = ({ check_url, url, cookie }) => {
    (0, request_1.default)(check_url, {
        method: 'post',
        headers: {
            Referer: url,
            Cookie: cookie
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
};
exports.signInApi = signInApi;
