import { Marked, Renderer } from 'marked-ts';
import * as tmp from 'tmp';
import * as util from 'util';
import * as child_process from 'child_process';
import * as fs from 'fs';
import { fail } from 'assert';

const mermaidName = "mermaid.cli";

const cmd = ["npx", mermaidName];

const help = `${process.argv[0]}: turn fenced mermaid markdown code blocks into inline svgs.

${process.argv[0]} parses and renders markdown code provided by STDIN. Importantly, where a fenced mermaid block
(\`\`\`mermaid <code> \`\`\`) exists in the markdown code, it is replaced transparently with
an SVG rendering of the mermaid code.

Flags for rendering are the same as \`${mermaidName}\`.

`
const tmpFile = (options: tmp.FileOptions): Promise<{
    name: string,
    fd: number,
    removeCallback: () => void
}> =>
    new Promise((ok, fail) => {
        tmp.file(options, (err: any, name: string, fd: number, removeCallback: () => void) => {
            if (err) fail(err);
            ok({ name, fd, removeCallback});
        })
    });


const main = async () => {
    if (process.argv.includes("-i")) throw new Error(`illegal -i flag: ${process.argv[0]} will specify its own inputs.`)
    if (process.argv.includes("-h")) {
        console.log(help);
        const { error } = child_process.spawnSync(cmd[0], [...cmd.slice(1), "-q", "-h"], {
            stdio: ['inherit', 'inherit', 'inherit']
        });
        if (error) throw error;
        return;
    }

    const [tmpInFile, tmpOutFile] = await Promise.all([".md",".svg"].map(async ext =>
        (await tmpFile({ postfix: ext })).name ));

    // has to be synchronous because Renderer is synchronous
    const mermaidify = (code: string): string => {
        fs.writeFileSync(tmpInFile, code, { flag: 'w'});

        const args = [...cmd.slice(1), "-o", tmpOutFile, "-i", tmpInFile, ...process.argv.slice(2)];

        console.error(`${cmd[0]} ${args.map(a => `"${a}"`).join(" ")}`);

        const { error, status } = child_process.spawnSync(cmd[0], args, {
            // pass thru stderr (i always wonder why this isnt the default)
            stdio: ['pipe', 'inherit', 'inherit']
        });

        if (error) throw error;
        if (status != 0) throw new Error(`${mermaidName} failed`);

        const svg: string = fs.readFileSync(tmpOutFile).toString();

        if (svg.trim().length == 0) throw new Error(`svg blank; ${mermaidName} likely failed`);

        return svg;
    }

    const renderer = new class MermaiddownRenderer extends Renderer {
        code(code: string, lang?: string, escaped?: boolean) {
            if (lang != "mermaid") return super.code(code, lang, escaped);
            return mermaidify(code);
        }
    }

    Marked.setOptions({ renderer });
    console.error("reading markdown from stdin...")
    console.log(`<!DOCTYPE HTML>${"\n"}${Marked.parse(fs.readFileSync(0, 'utf-8'))}`);
}

main().catch(error => {
    console.log(error);
});