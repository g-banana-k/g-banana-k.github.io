import * as path from "node:path";
import * as fs from "node:fs/promises";
import { Post } from "../cms_wrapper";

const read = async (p: string): Promise<Post[]> => {
	const p2 = path.resolve(process.cwd(), "contents", p);
	const dir = await fs.readdir(p2);
	const res: Promise<Post>[] = [];
	for (const name of dir) res.push((async (name) => {})(name));
	return Promise.all(res);
};
