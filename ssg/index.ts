import * as fs from "fs/promises";
import { existsSync as exists } from "fs";
import * as path_lib from "path";
import { read } from "./markdown/main.js";
import { note_template } from "./template/note.js";
import { sludgetale_template } from "./template/sludgetale.js";

const main = async (root: string) => {
    const dir = (await fs.readdir(`${root}/site`));
    // await rm(`${root}/dist`);
    await mkdir(`${root}/dist`);
    const ctx = new Context(root);
    return ctx.generate(dir);
}
class Context {
    root: string;
    constructor(root: string) {
        this.root = root;
    }
    async generate(r_paths: string[]) {
        const promises: Promise<void>[] = [];
        r_paths.forEach((r_path) => promises.push((async r_path => {
            const path = `${this.root}/site/${r_path}`;
            const kind = await check_kind(path);
            if (kind === "dir") {
                const dir = await fs.readdir(path);
                await mkdir(`${this.root}/dist/${r_path}`);
                await this.generate(dir.map(name => `${r_path}/${name}`));
            } else if (kind === "file") {
                await fs.copyFile(path, `${this.root}/dist/${r_path}`)
            } else if (kind === "md") {
                const code = (await fs.readFile(path)).toString();
                const html = await this.generate_page(code, r_path.replace(/\.md$/, ""));
                fs.writeFile(`${this.root}/dist/${r_path}`.replace(/\.md$/, '.html'), html);
            }
        })(r_path)))
        await Promise.all(promises);
    }
    async generate_page(code: string, r_path: string) {
        const [html, metadata] = await read(code);
        if (metadata.category === "sludgetale") {
            return sludgetale_template(html, metadata, r_path);
        } else {
            return note_template(html, metadata, r_path)
        }
    }
}

const check_kind = async (path: string): Promise<"file" | "md" | "dir"> => {
    const stat = await fs.stat(path);
    if (stat.isDirectory()) return "dir"
    else if (path_lib.extname(path) === ".md") return "md";
    else return "file";
}

const rm = async (path: string) => {
    if (exists(path)) await fs.rm(path, { recursive: true });
}

const mkdir = async (path: string) => {
    if (!exists(path)) await fs.mkdir(path);
}

main(process.cwd())