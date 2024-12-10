import * as fs from "node:fs/promises";
import * as fs_sync from "node:fs";
import * as path from "node:path";
import type { Page } from "./core/page";

export type Routes = Map<string, Page | Routes>;

const isRoutes = (arg: Page | Routes): arg is Routes => {
    if ((arg as { has?: true }).has) return true;
    return false;
};

export const generate = async (routes: Routes) => {
    const arr: { path: string; body: Page }[] = [];
    const cache: { t_s: number } = JSON.parse(await fs.readFile("./syzygy/cache.json", "utf-8"));
    routes_to_arr(arr, routes, "");
    for (const p of arr) {
        const page_path = path.join("./result", `${p.path}.html`);
        mkdir(path.dirname(page_path));
        fs.writeFile(page_path, p.body.render());
    }
    await fs.copyFile("./dist/bundle.css", "./result/bundle.css");
    const t_s = await newest_stamp("public");
    if (cache.t_s === t_s) return;
    cache.t_s = t_s;
    await fs.writeFile("./syzygy/cache.json", JSON.stringify(cache), "utf-8");
    await copy_dir("public", "result");
};

const mkdir = async (path: string) => {
    if (!fs_sync.existsSync(path)) await fs.mkdir(path, { recursive: true });
};

const routes_to_arr = (
    arr: { path: string; body: Page }[],
    routes: Routes,
    r_path: string,
) => {
    routes.forEach((v, name) => {
        if (isRoutes(v)) routes_to_arr(arr, v, `${r_path}/${name}`);
        else arr.push({ path: `${r_path}/${name}`, body: v });
    });
};

const copy_dir = async (src: string, dest: string) => {
    const entries = await fs.readdir(src, { withFileTypes: true });
    await mkdir(dest);
    const promises: Promise<void>[] = []
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
}

const newest_stamp = async (src: string): Promise<number> => {
    const entries = await fs.readdir(src, { withFileTypes: true });
    const promises: Promise<number>[] = [];
    for (const entry of entries) {
        const src_path = path.join(src, entry.name);
        if (entry.isDirectory()) {
            promises.push(newest_stamp(src_path));
        } else {
            promises.push(fs.stat(src_path).then(s => s.mtimeMs));
        }
    }
    const arr = await Promise.all(promises);
    return Math.max(...arr);
}
