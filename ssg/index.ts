import * as fs from "fs/promises";
import { existsSync as exists } from "fs";
import * as path_lib from "path";
import { read } from "./markdown/main.js";
import { note_template } from "./template/note.js";
import { sludgetale_template } from "./template/sludgetale.js";
import { footer } from "./template/footer.js";
import { MetaData, MetaDataRaw } from "./metadata/main.js";
import parseMD from "parse-md";

const main = async (root: string) => {
    const dir = (await fs.readdir(`${root}/site`));
    // await rm(`${root}/dist`);
    await mkdir(`${root}/dist`);
    const ctx = new Context(root);
    await ctx.generate(dir);
    fs.writeFile(`${root}/dist/db.js`, `export default ${ctx.db_to_json()}`);
}

type DB = {
    map: Map<string, {
        category: "sludgetale" | "note" | "uncategorized",
        tag: string[]
    }>;
}

class Context {
    root: string;
    db: DB;
    constructor(root: string) {
        this.root = root;
        this.db = {
            map: new Map(),
        };
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
                if (path_lib.extname(path) === ".html") {
                    const html_source = (await fs.readFile(path)).toString();
                    const html = html_source.replace(/{{\s*footer\s*}}/g, footer());
                    await fs.writeFile(`${this.root}/dist/${r_path}`, html)
                } else {
                    await fs.copyFile(path, `${this.root}/dist/${r_path}`)
                }
            } else if (kind === "md") {
                const code = (await fs.readFile(path)).toString();
                const [html, metadata] = await this.generate_page(code, r_path.replace(/\.md$/, ""));
                fs.writeFile(`${this.root}/dist/${r_path}`.replace(/\.md$/, '.html'), html);
                this.db.map.set(r_path.replace(/\.md$/, ""), {
                    category: metadata.category ?? "uncategorized",
                    tag: metadata.tag,
                });
            } else if (kind === "metadata") {
                const code = (await fs.readFile(path)).toString();
                const metadata = new MetaData(parseMD(code).metadata as MetaDataRaw)
                this.db.map.set(r_path.replace(/\.meta.md$/, ""), {
                    category: metadata.category ?? "uncategorized",
                    tag: metadata.tag,
                });
            }
        })(r_path)))
        await Promise.all(promises);
    }
    async generate_page(code: string, r_path: string): Promise<[string, MetaData]> {
        const [html, metadata] = await read(code);
        if (metadata.category === "sludgetale") {
            return [sludgetale_template(html, metadata, r_path), metadata];
        } else {
            return [note_template(html, metadata, r_path), metadata]
        }
    }
    db_to_json() {
        const map_arr = [...this.db.map];
        return JSON.stringify({
            map: map_arr
        })
    }
}

const check_kind = async (path: string): Promise<"file" | "md" | "metadata" | "dir"> => {
    const stat = await fs.stat(path);
    if (stat.isDirectory()) return "dir"
    else if (path_lib.extname(path) === ".md") return "md";
    else if (path.endsWith(".meta.md")) return "metadata";
    else return "file";
}

const rm = async (path: string) => {
    if (exists(path)) await fs.rm(path, { recursive: true });
}

const mkdir = async (path: string) => {
    if (!exists(path)) await fs.mkdir(path);
}

main(process.cwd())