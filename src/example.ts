import { NewMermaiddown } from './index';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

const main = async () => {
    const md = NewMermaiddown({});
    const code = promisify(readFile)("_README.md");

    const newFile = (await md).replaceAll((await code).toString());
    await promisify(writeFile)("README.md", await newFile);
}

main().catch(e => console.error(e));