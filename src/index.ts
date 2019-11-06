import * as puppeteer from 'puppeteer';
import { AssertionError, ok } from 'assert';
import mermaid from 'mermaid';
import mermaidAPI from 'mermaid/mermaidAPI';
import { List } from 'immutable';
import {writeFile} from 'fs';
import { promisify } from 'util';

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

    async replaceAll(mdcode: string): Promise<string> {
        return replace(mdcode, reMermaid, async match => {
            const { title, filename, content: code } = match.groups as { title: string, filename: string, content: string};
            const svg = this.render({code});

            await promisify(writeFile)(filename, await svg)

            return `[${title}]: ${filename}\n![${filename}]`
        })
    }

    async render({ code, config }: {
        code: string,
        config?: mermaidAPI.Config
    }): Promise<string> {
        const p = new Page({ page: await this.puppet.newPage()});

        p.navigateToCode(
            "text/html",
            "<!DOCTYPE HTML><title>mermaid renderer</title>"
        )

        const svg = await p.page.evaluate(() => {
            mermaid.initialize(config || {})

            return new Promise<string>((ok, fail) => mermaidAPI.render('', code, svgCode => ok(svgCode)));
        });

        p.page.close();
        return svg;
    }  
}

export class Page {
    page: puppeteer.Page;
    constructor({ page }: {
        page: puppeteer.Page,
    }) {
        this.page = page;
    }

    async navigateToCode(mime: string, code: string) {
        await this.page.goto(
            `data:${mime},${encodeURIComponent(code)}`
        );
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
    puppet = puppet || await puppeteer.launch();
    return new Mermaiddown({puppet})
};


