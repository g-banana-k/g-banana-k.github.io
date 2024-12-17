import * as fs from "node:fs/promises";
import * as fs_sync from "node:fs";
import * as path from "node:path";
import type { Page } from "./core/page";

export type Routes = Map<string, Page | Routes>;

export const isRoutes = (arg: Page | Routes | undefined): arg is Routes => {
    if (typeof arg === "object" && (arg as { has?: true }).has) return true;
    return false;
};

export const generate = async (routes: Routes) => {
    const map = new Map<string, Page>();
    // const cache: { t_s: number } = fs_sync.existsSync("./syzygy/cache.json") ? JSON.parse(
    //     await fs.readFile("./syzygy/cache.json", "utf-8"),
    // ) : { t_s: 0 };
    flat(map, routes, "");
    for (const p of map) {
        const page = { path: p[0], body: p[1] };
        const page_path = path.join("./result", `${page.path}.html`);
        mkdir(path.dirname(page_path));
        fs.writeFile(page_path, page.body.render());
    }
    await fs.copyFile("./dist/bundle.css", "./result/bundle.css");
    // const t_s = await newest_stamp("public");
    // if (cache.t_s === t_s) return;
    // cache.t_s = t_s;
    // await fs.writeFile("./syzygy/cache.json", JSON.stringify(cache), "utf-8");
    await copy_dir("public", "result");
};

const mkdir = async (path: string) => {
    if (!fs_sync.existsSync(path)) await fs.mkdir(path, { recursive: true });
};

export const flat = (
    map: Map<string, Page>,
    routes: Routes,
    r_path: string,
) => {
    routes.forEach((v, name) => {
        if (isRoutes(v)) flat(map, v, `${r_path}/${name}`);
        else map.set(`${r_path}/${name}`, v);
    });
};

const copy_dir = async (src: string, dest: string) => {
    const entries = await fs.readdir(src, { withFileTypes: true });
    await mkdir(dest);
    const promises: Promise<void>[] = [];
    for (const entry of entries) {
        const src_path = path.join(src, entry.name);
        const dest_path = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            promises.push(copy_dir(src_path, dest_path));
        } else {
            promises.push(fs.copyFile(src_path, dest_path));
        }
    }
    await Promise.all(promises);
};

const newest_stamp = async (src: string): Promise<number> => {
    const entries = await fs.readdir(src, { withFileTypes: true });
    const promises: Promise<number>[] = [];
    for (const entry of entries) {
        const src_path = path.join(src, entry.name);
        if (entry.isDirectory()) {
            promises.push(newest_stamp(src_path));
        } else {
            promises.push(fs.stat(src_path).then((s) => s.mtimeMs));
        }
    }
    const arr = await Promise.all(promises);
    return Math.max(...arr);
};
