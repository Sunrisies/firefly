"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapForPreset = void 0;
const template = {
    "common-lib": {
        files: [],
        npm: [],
    },
    vue: {
        files: [],
        npm: ["vue"],
    },
    react: {
        files: [],
        npm: ["react", "react-dom", "@types/react", "@types/react-dom"],
    },
};
const buildTool = {
    webpack: {
        files: [],
        npm: ["webpack"],
    },
    vite: {
        files: [],
        npm: ["vite"],
    },
    rollup: {
        files: [],
        npm: ["rollup"],
    },
};
const plugins = {
    Babel: {
        files: [],
        npm: ["@babel/core", "@babel/preset-env", "babel-loader"],
    },
    TypeScript: {
        files: [],
        npm: ["typescript", "@types/node", "ts-loader"],
    },
    Eslint: {
        files: [],
        npm: [],
    },
    Prettier: {
        files: [],
        npm: [],
    },
};
const mapForPreset = { template, buildTool, plugins };
exports.mapForPreset = mapForPreset;
