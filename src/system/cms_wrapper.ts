import {
	type NoSerialize,
	noSerialize,
	type JSXOutput,
} from "@builder.io/qwik";
import { read_content, read_list } from "./fs";
import { tags } from "./fs/tags";

export class Post {
	title: string;
	tags: string[];
	name: string;
	published: string;
	updated: string;
	content: JSXOutput;
	constructor(
		content: JSXOutput,
		title: string,
		tags: string[],
		name: string,
		published: string,
		updated?: string,
	) {
		this.title = title;
		this.tags = tags;
		this.name = name;
		this.published = published;
		this.updated = updated ?? published;
		this.content = content;
	}
}

export const categories = ["blog"] as const;

export const get_list = async (
	category: typeof categories[number],
): Promise<NoSerialize<Post>[]> => {
	return (await read_list(category)).map(noSerialize);
};

export const get_content = async (
	category: typeof categories[number],
	name: string,
): Promise<NoSerialize<Post>> => {
	return noSerialize(await read_content(category, name));
};

export const get_tags = async (): Promise<Map<string, string>> => {
	return tags;
};

export const get_tag_list = async (): Promise<
	{ name: string; color: string; pages: number }[]
> => {
	const m = new Map<string, number>();
	const tags = await get_tags();
	for (const [tag, _] of tags) {
		m.set(tag, 0);
	}
	for (const category of categories) {
		const p_list = await read_list(category);
		for (const post of p_list) {
			for (const tag of post.tags) {
				if (!m.has(tag)) continue;
				m.set(tag, m.get(tag) ?? 0 + 1);
			}
		}
	}
	const res: { name: string; color: string; pages: number }[] = [];
	for (const [tag, pages] of m) {
		res.push({name: tag, pages, color: tags.get(tag) ?? "hsl(0, 0%, 90%)"});
	}
	return res;
};

export const get_tagged_list = async (
	category: typeof categories[number],
	tag: string,
): Promise<NoSerialize<Post>[]> => {
	throw new Error();
};
