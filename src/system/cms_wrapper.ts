import type { JSXOutput } from "@builder.io/qwik";
import { read_content, read_list } from "./fs";
import { tag_list, tags } from "./fs/tags";
import { parse } from "./fs/md";
import { Translate } from "./fs/translate";

export type PostJson = string & { __brand: "post_json" };
export class Post {
	title: string;
	tags: string[];
	name: string;
	published: string;
	updated: string;
	content: string;
	category: string;
	link: string;
	constructor(
		content: string,
		title: string,
		tags: string[],
		name: string,
		published: string,
		updated: string,
		category: string,
		link: string,
	) {
		this.content = content;
		this.title = title;
		this.tags = tags;
		this.name = name;
		this.published = published;
		this.updated = updated;
		this.category = category;
		this.link = link;
	}
	as_json(): PostJson {
		return JSON.stringify({ ...this }) as PostJson;
	}
	jsx(): JSXOutput {
		const [root] = parse(this.content);
		const translator = new Translate({});
		const content = translator.nodes(root.children);
		return content;
	}
	static from_json(json: PostJson) {
		const o: Post = JSON.parse(json);
		return new Post(
			o.content,
			o.title,
			o.tags,
			o.name,
			o.published,
			o.updated,
			o.category,
			o.link,
		);
	}
}

export const categories = ["blog", "info"] as const;

export const get_list = async (
	category: (typeof categories)[number],
): Promise<PostJson[]> => {
	return (await read_list(category)).map((post) => post.as_json());
};

export const get_content = async (
	category: (typeof categories)[number],
	name: string,
): Promise<PostJson> => {
	return (await read_content(category, name)).as_json();
};

export const get_tags = async (): Promise<Map<string, string>> => {
	return tags;
};

export const get_tag_list = async (): Promise<
	{ name: string; color: string; pages: number }[]
> => {
	return await tag_list();
};

export const get_tagged_list = async (tag: string): Promise<PostJson[]> => {
	const res: Promise<Post[]>[] = [];
	for (const category of categories) {
		res.push(read_list(category));
	}
	return (await Promise.all(res))
		.flat()
		.filter((post) => post.tags.includes(tag))
		.map((post) => post.as_json());
};
