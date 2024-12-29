import { read_list } from ".";
import { categories } from "../cms_wrapper";

export const tags = new Map<string, string>([
	["gBanaKnal", "hsl(48, 100%, 90%)"],
	["Info", "hsl(0, 0%, 90%)"],
]);

export const tag_list = async () => {
	const m = new Map<string, number>();
	for (const [tag, _] of tags) {
		m.set(tag, 0);
	}
	for (const category of categories) {
		const p_list = await read_list(category);
		for (const post of p_list) {
			for (const tag of post.tags) {
				if (!m.has(tag)) continue;
				m.set(tag, (m.get(tag) ?? 0) + 1);
			}
		}
	}
	const res: { name: string; color: string; pages: number }[] = [];
	for (const [tag, pages] of m) {
		res.push({ name: tag, pages, color: tags.get(tag) ?? "hsl(0, 0%, 90%)" });
	}
	return res;
};
