import { type NoSerialize, noSerialize, type JSXOutput } from "@builder.io/qwik";
import { read_content, read_list } from "./fs";

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

export const get_list = async (category: "blog"): Promise<NoSerialize<Post>[]> => {
	return (await read_list(category)).map(noSerialize);
};

export const get_content = async (
	category: "blog",
	name: string,
): Promise<NoSerialize<Post>> => {
	return noSerialize(await read_content(category, name))
};
