"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDirectory = void 0;
const utils_1 = require("@laconic/utils");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = __importDefault(require("fs-extra"));
async function removeDirectory(directoryPath = "node_modules", verbose = true) {
    const fullPath = (0, utils_1.resolveApp)(directoryPath);
    async function deleteDirectory() {
        try {
            await fs_extra_1.default.remove(fullPath);
            return true;
        }
        catch (error) {
            console.error(chalk_1.default.bold.red("Deletion failed"), error);
            return false;
        }
    }
    if (verbose) {
        const spinner = (0, ora_1.default)(chalk_1.default.bold.cyan("File being deleted...")).start();
        const success = await deleteDirectory();
        if (success) {
            spinner.succeed(chalk_1.default.bold.green("Deleted successfully"));
        }
        else {
            spinner.fail(chalk_1.default.bold.red("Deletion failed"));
        }
    }
    else {
        await deleteDirectory();
    }
}
exports.removeDirectory = removeDirectory;
async function copyFolderRecursive(sourceDir, destinationDir) {
    try {
        await fs_extra_1.default.ensureDir(destinationDir);
        await fs_extra_1.default.copy(sourceDir, destinationDir);
    }
    catch (error) {
        console.error(chalk_1.default.red("\n 😡😡😡 An error occurred during the template download, please try again"), error);
        process.exit(1);
    }
}
