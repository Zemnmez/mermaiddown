import { NewMermaiddown } from './index';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';
import puppeteer from 'puppeteer';

const debug = false;

const main = async () => {
    const md = NewMermaiddown({
        puppet: await puppeteer.launch({ headless: !debug })
    });
    const code = promisify(readFile)("_README.md");

    const newFile = (await md).replaceAll((await code).toString());
    await promisify(writeFile)("README.md", await newFile);
    (await md).close();
}

main().catch(e => (console.error(e), (!debug) && process.exit(1)));