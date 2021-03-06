import { AssertionError, ok } from 'assert';
import { List } from 'immutable';
import {writeFile, readFile} from 'fs';
import { promisify } from 'util';
import { renderMermaid } from 'mermaid-render';
import * as puppeteer from 'puppeteer';

const reMermaid = /^```mermaid\n%%%%(?<title>[^\n`%]+)%%%%\n%%%%(?<filename>[^%`\n]+)%%%%\n(?<content>(?:[^`]|`[^`]|``[^`])*)^```$/gim

type replacer = (params: RegExpExecArray) => Promise<string>
const replace = async (str: string, re: RegExp, replacer: replacer) => {
    re.lastIndex = 0;
    let repls: List<Promise<{
        start: number,
        end: number,
        replacement: string
    }>> = List();

    for (let m: RegExpExecArray | null;;) {
        m = re.exec(str);
        if (!m) break;
        const [ start, end ] = [ m.index, re.lastIndex ];

        repls = repls.push((async () => {
            const replacement = await replacer(m);
            return  {
                start,
                end,
                replacement
            }
        })());
    }

    let bits: List<string> = List();
    const resolvedRepls = await Promise.all(repls);
    let prevEnd = 0;
    resolvedRepls.forEach(({start, end, replacement}) => {
        bits = bits.push(str.slice(prevEnd, start));
        bits = bits.push(replacement);
        prevEnd = end;
    })

    bits = bits.push(str.slice(prevEnd));

    return bits.join("");
}

export class Mermaiddown {
    puppet: puppeteer.Browser;
    constructor({ puppet }: {
        puppet: puppeteer.Browser
    }) {
        this.puppet = puppet;
    }

    close() { return this.puppet.close() }

    async replaceAll(mdcode: string): Promise<string> {
        return replace(mdcode, reMermaid, async match => {
            let { title, filename, content: code } = match.groups as { title: string, filename: string, content: string};
            [title, filename, code] = [title, filename, code].map(v => v.trim())
            const svg = this.render({code});

            console.log("saving to", filename);
            await promisify(writeFile)(filename, await svg)
            console.log("saved", filename);

            return `[${title}]: ${filename}\n![${title}]`
        })
    }

    async render({ code, config }: {
        code: string,
        config?: any
    }): Promise<string> {
        return renderMermaid(code, {
            browser: this.puppet,
            initParams: config
        })
    }  
}

const isUndefined = (x: any): x is undefined => 
    x === undefined;



function assert(condition: any, error: AssertionError): asserts condition {
    if (!condition) {
        throw error
    }
}

export async function NewMermaiddown({ puppet }: {
    puppet?: puppeteer.Browser
}): Promise<Mermaiddown> {
    puppet = puppet || await puppeteer.launch({
        // for wsl support
        args: ["--no-sandbox"]
    });
    return new Mermaiddown({puppet})
};