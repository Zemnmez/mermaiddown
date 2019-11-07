"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const immutable_1 = require("immutable");
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const reMermaid = /^```mermaid\n%%%%(?<title>[^\n`%]+)%%%%\n%%%%(?<filename>[^%`\n]+)%%%%\n(?<content>(?:[^`]|`[^`]|``[^`])*)^```$/gim;
const replace = async (str, re, replacer) => {
    re.lastIndex = 0;
    let repls = immutable_1.List();
    for (let m;;) {
        m = re.exec(str);
        if (!m)
            break;
        const [start, end] = [m.index, re.lastIndex];
        repls = repls.push((async () => {
            const replacement = await replacer(m);
            return {
                start,
                end,
                replacement
            };
        })());
    }
    let bits = immutable_1.List();
    const resolvedRepls = await Promise.all(repls);
    let prevEnd = 0;
    resolvedRepls.forEach(({ start, end, replacement }) => {
        bits = bits.push(str.slice(prevEnd, start));
        bits = bits.push(replacement);
        prevEnd = end;
    });
    bits = bits.push(str.slice(prevEnd));
    return bits.join("");
};
class Mermaiddown {
    constructor({ puppet }) {
        this.puppet = puppet;
    }
    close() { return this.puppet.close(); }
    async replaceAll(mdcode) {
        return replace(mdcode, reMermaid, async (match) => {
            let { title, filename, content: code } = match.groups;
            [title, filename, code] = [title, filename, code].map(v => v.trim());
            const svg = this.render({ code });
            console.log("saving to", filename);
            await util_1.promisify(fs_1.writeFile)(filename, await svg);
            console.log("saved", filename);
            return `[${title}]: ${filename}\n![${title}]`;
        });
    }
    async render({ code, config }) {
        const p = new Page({ page: await this.puppet.newPage() });
        await p.page.goto(`file://${path_1.join(__dirname, "index.html")}`);
        await p.page.waitForFunction('window.mermaid.mermaidAPI.initialize');
        const svg = await p.page.evaluate((code) => {
            const mermaid = window["mermaid"];
            const mermaidAPI = mermaid.mermaidAPI;
            mermaid.mermaidAPI.initialize({});
            return new Promise((ok, fail) => mermaidAPI.render('render', code, (svgCode) => ok(svgCode)));
        }, code);
        p.page.close();
        return svg;
    }
}
exports.Mermaiddown = Mermaiddown;
class Page {
    constructor({ page }) {
        this.page = page;
    }
}
exports.Page = Page;
const isUndefined = (x) => x === undefined;
function assert(condition, error) {
    if (!condition) {
        throw error;
    }
}
async function NewMermaiddown({ puppet }) {
    puppet = puppet || await puppeteer_1.default.launch();
    return new Mermaiddown({ puppet });
}
exports.NewMermaiddown = NewMermaiddown;
;
