"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const fs_1 = require("fs");
const util_1 = require("util");
const puppeteer_1 = __importDefault(require("puppeteer"));
const debug = false;
const main = async () => {
    const md = index_1.NewMermaiddown({
        puppet: await puppeteer_1.default.launch({
            args: ["--no-sandbox"],
            headless: !debug
        })
    });
    const code = util_1.promisify(fs_1.readFile)("_README.md");
    const newFile = (await md).replaceAll((await code).toString());
    await util_1.promisify(fs_1.writeFile)("README.md", await newFile);
    (await md).close();
};
main().catch(e => (console.error(e), (!debug) && process.exit(1)));
