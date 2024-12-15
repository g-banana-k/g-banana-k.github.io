import * as fs from "node:fs/promises";
import * as path_lib from "node:path";
import { RMap } from "~/site/system/r_map";

export const rel_path = (path: string) => path_lib.join(process.cwd(), path);

export const crawl = async (
    root: string,
    parent = "",
    r_paths: string[] = [],
): Promise<RMap<{ code: string }>> => {
    const res = RMap.new<{ code: string }>();
    if (!res.is_map()) throw new Error();
    const promises: Promise<void>[] = [];
    for (const r_path of r_paths)
        promises.push(
            (async (r_path) => {
                const path = path_lib.join(root, parent, r_path);
                const kind = await check_kind(path);
                if (kind === "dir") {
                    const dir = await fs.readdir(path);
                    res.set(
                        r_path,
                        await crawl(root, path_lib.join(parent, r_path), dir),
                    );
                } else if (kind === "file") {
                } else if (kind === "md") {
                    const name = r_path.slice(0, -3);
                    const code = await fs.readFile(path, "utf-8");
                    res.set(name, { code });
                }
            })(r_path),
        );
    await Promise.all(promises);
    return res;
};
type Kind = "dir" | "file" | "md";

const check_kind = async (path: string): Promise<Kind> => {
    const stat = await fs.stat(path);
    if (stat.isDirectory()) return "dir";
    if (path_lib.extname(path) === ".md") return "md";
    return "file";
};
