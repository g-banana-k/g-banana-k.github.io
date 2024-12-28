import {
	type NoSerialize,
	noSerialize,
	type JSXOutput,
} from "@builder.io/qwik";
import { read_content, read_list } from "./fs";
import { tag_list, tags } from "./fs/tags";

export class Post {
	title: string;
	tags: string[];
	name: string;
	published: string;
	updated: string;
	content: JSXOutput;
	category: string;
	constructor(
		content: JSXOutput,
		title: string,
		tags: string[],
		name: string,
		published: string,
		updated: string,
		category: string,
	) {
		this.title = title;
		this.tags = tags;
		this.name = name;
		this.published = published;
		this.updated = updated;
		this.content = content;
		this.category = category;
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
	return await tag_list();
};

export const get_tagged_list = async (
	tag: string,
): Promise<NoSerialize<Post>[]> => {
	const res: Promise<Post[]>[] = [];
	for (const category of categories) {
		res.push(read_list(category));
	}
	return (await Promise.all(res)).flat().filter(post => post.tags.includes(tag)).map(noSerialize)
};
