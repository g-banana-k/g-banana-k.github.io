import * as fs from "node:fs/promises";
import * as path_lib from "node:path";
import { Translate } from "./translate";
import { ArticleData } from "./markdown";
import type { Node } from "~/syzygy/core/element";

export type Dir<T> = T | Map<string, T>;

export class Crawl {
    root: string;
    pages: Dir<{ code: string }>;
    constructor(root: string) {
        this.root = root;
        this.pages = new Map();
    }
    async crawl(r_paths: string[]) {
        const promises: Promise<void>[] = [];
        for (const r_path of r_paths) promises.push((async r_path => {
            const path = `${this.root}/${r_path}`;
            const kind = await check_kind(path);
            if (kind === "dir") {
                const dir = await fs.readdir(path);
                await this.crawl(dir.map(name => `${r_path}/${name}`));
            } else if (kind === "file") {
            } else if (kind === "md") {
                const name = r_path.slice(0, -3);
                const source = await fs.readFile(path, "utf-8");
                const data = new ArticleData(source, name);
                const page = new Translate({}).nodes(data.body.children);
                m.set(name, { data, body: page })
            }
        })(r_path));
        await Promise.all(promises);
    }
}

type Kind = "dir" | "file" | "md"

export const deep_map = <T, U>(dir: Dir<T>, f: (arg: T) => U): Dir<U> => {
    if (typeof dir === "object" && dir instanceof Map) {
        const n_m = new Map<string, U>();
        dir.forEach((v, k) => {
            n_m.set(k, f(v));
        })
        return n_m;
    }
    return f(dir as T);
}

const check_kind = async (path: string): Promise<Kind> => {
    const stat = await fs.stat(path);
    if (stat.isDirectory()) return "dir"
    if (path_lib.extname(path) === ".md") return "md";
    return "file";
}