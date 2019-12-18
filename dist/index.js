"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const fs_1 = require("fs");
const util_1 = require("util");
const mermaid_render_1 = require("mermaid-render");
const puppeteer = __importStar(require("puppeteer"));
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
        return mermaid_render_1.renderMermaid(code, {
            browser: this.puppet,
            initParams: config
        });
    }
}
exports.Mermaiddown = Mermaiddown;
const isUndefined = (x) => x === undefined;
function assert(condition, error) {
    if (!condition) {
        throw error;
    }
}
async function NewMermaiddown({ puppet }) {
    puppet = puppet || await puppeteer.launch({
        // for wsl support
        args: ["--no-sandbox"]
    });
    return new Mermaiddown({ puppet });
}
exports.NewMermaiddown = NewMermaiddown;
;
