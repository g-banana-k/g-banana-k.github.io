import * as fs from "fs/promises";
import { existsSync as exists } from "fs";
import * as path_lib from "path";
import { read } from "./markdown/main.js";
import { note_template } from "./template/note.js";
import { sludgetale_template } from "./template/sludgetale.js";
import { footer } from "./template/footer.js";
import { MetaData, MetaDataRaw } from "./metadata/main.js";
import parseMD from "parse-md";
import { minify } from "terser"


const main = async (root: string) => {
    const dir = (await fs.readdir(`${root}/site`));
    // await rm(`${root}/dist`);
    await mkdir(`${root}/dist`);
    const ctx = new Context(root);
    await ctx.crawl(dir);
    await ctx.generate();
    fs.writeFile(`${root}/dist/db.js`, `export default ${ctx.db_to_json()}`);
}

type DB = {
    map: Map<string, {
        category: "sludgetale" | "note" | "uncategorized",
        tag: string[],
        title: string,
        subtitle: string,
    }>;
}

class Context {
    root: string;
    db: DB;
    pages: Map<string, { dest: string, code: string, kind: Kind }>;
    constructor(root: string) {
        this.root = root;
        this.db = {
            map: new Map(),
        };
        this.pages = new Map();
    }
    async crawl(r_paths: string[]) {
        const promises: Promise<void>[] = [];
        r_paths.forEach((r_path) => promises.push((async r_path => {
            const path = `${this.root}/site/${r_path}`;
            const kind = await check_kind(path);
            if (kind === "dir") {
                const dir = await fs.readdir(path);
                await mkdir(`${this.root}/dist/${r_path}`);
                await this.crawl(dir.map(name => `${r_path}/${name}`));
            } else if (kind === "html") {
                const html_source = (await fs.readFile(path)).toString();
                const html = html_source.replace(/{{\s*footer\s*}}/g, footer());
                this.pages.set(r_path.replace(/\.html$/, ""), { dest: `${this.root}/dist/${r_path}`, code: html, kind });
            } else if (kind === "file") {
                this.pages.set(r_path, { dest: `${this.root}/dist/${r_path}`, code: "binary", kind });
            } else if (kind === "md") {
                const source = (await fs.readFile(path)).toString();
                const metadata = new MetaData(parseMD(source).metadata as MetaDataRaw);
                this.pages.set(r_path.replace(/(\.md|\.md\/|\/index\.md|\/index\.md\/)$/, ""), { dest: `${this.root}/dist/${r_path.replace(/\.md|\.md\/$/, ".html")}`, code: source, kind });
                this.db.map.set(r_path.replace(/(\.md|\.md\/|index\.md|index\.md\/)$/, ""), {
                    category: metadata.category ?? "uncategorized",
                    tag: metadata.tag,
                    title: metadata.title ?? "Untitled",
                    subtitle: metadata.subtitle ?? "untitled",
                });
            } else if (kind === "js") {
                const source = (await fs.readFile(path)).toString();
                this.pages.set(r_path, { dest: `${this.root}/dist/${r_path}`, code: source, kind });
            } else if (kind === "metadata") {
                const source = (await fs.readFile(path)).toString();
                this.pages.set(r_path, { dest: "none", code: source, kind });
                const metadata = new MetaData(parseMD(source).metadata as MetaDataRaw)
                this.db.map.set(r_path.replace(/\.meta.md$/, ""), {
                    category: metadata.category ?? "uncategorized",
                    tag: metadata.tag,
                    title: metadata.title ?? "Untitled",
                    subtitle: metadata.subtitle ?? "untitled",
                });
            }
        })(r_path)))
        await Promise.all(promises);
    }
    async generate() {
        const promises: Promise<void>[] = [];
        this.pages.forEach(({ dest, kind, code }, r_path) => promises.push((async () => {
            if (kind === "html") {
                await fs.writeFile(dest, code);
            } else if (kind === "file") {
                await fs.copyFile(`${this.root}/site/${r_path}`, dest)
            } else if (kind === "md") {
                await fs.writeFile(dest, (await this.generate_page(code, r_path))[0]);
            } else if (kind === "js") {
                const minified = await minify(code, {});
                await fs.writeFile(dest,minified.code ?? "");
            }
        })()))
        await Promise.all(promises);
    }
    async generate_page(code: string, r_path: string): Promise<[string, MetaData]> {
        const [html, metadata] = await read(code, this.pages);
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

type Kind = "file" | "html" | "md" | "metadata" | "dir" |"js";

const check_kind = async (path: string): Promise<Kind> => {
    const stat = await fs.stat(path);
    if (stat.isDirectory()) return "dir"
    else if (path_lib.extname(path) === ".md") return "md";
    else if (path_lib.extname(path) === ".html") return "html";
    else if (path.endsWith(".meta.md")) return "metadata";
    else if (path.endsWith(".js")) return "js";
    else return "file";
}

const rm = async (path: string) => {
    if (exists(path)) await fs.rm(path, { recursive: true });
}

const mkdir = async (path: string) => {
    if (!exists(path)) await fs.mkdir(path);
}

main(process.cwd())