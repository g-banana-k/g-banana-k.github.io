import * as path from "node:path";
import * as fs from "node:fs/promises";
import { Post } from "../cms_wrapper";
import { Translate } from "./translate";
import { parse } from "./md";

import { z } from "zod";

export const read_list = async (p: string): Promise<Post[]> => {
	const p2 = path.resolve(process.cwd(), "contents", p);
	const dir = await fs.readdir(p2);
	const promises: Promise<void>[] = [];
	const res: Post[] = [];
	const translator = new Translate({});
	for (const name of dir)
		promises.push(
			(async (name) => {
				const p3 = path.resolve(p2, name);
				const p4 = path.resolve(p3, "index.md");
				const code = await fs
					.readFile(p3, "utf-8")
					.catch(() => fs.readFile(p4, "utf-8"));
				const [root, f_m_unknown] = parse(code);
				const f_m: Frontmatter = f_m_scheme.parse(f_m_unknown);
				const content = translator.nodes(root.children);
				res.push(
					new Post(
						content,
						f_m.title ?? "Untitled",
						f_m.tags ?? [],
						name.replace(/\.md|\.mdx/, ""),
						f_m.published ?? "None",
						f_m.updated ?? f_m.published ?? "None",
						p,
						`/${p}/${name.replace(/\.md|\.mdx/, "")}`,
					),
				);
			})(name),
		);
	await Promise.all(promises);
	return res;
};

export const read_content = async (p: string, name: string): Promise<Post> => {
	const p2 = path.resolve(process.cwd(), "contents", p, `${name}.md`);
	const p3 = path.resolve(process.cwd(), "contents", p, `${name}.mdx`);
	const p4 = path.resolve(process.cwd(), "contents", p, name, "index.md");
	const p5 = path.resolve(process.cwd(), "contents", p, name, "index.mdx");
	const code = await fs
		.readFile(p2, "utf-8")
		.catch(() => fs.readFile(p3, "utf-8"))
		.catch(() => fs.readFile(p4, "utf-8"))
		.catch(() => fs.readFile(p5, "utf-8"));

	const translator = new Translate({});

	const [root, f_m_unknown] = parse(code);
	const f_m: Frontmatter = f_m_scheme.parse(f_m_unknown);
	const content = translator.nodes(root.children);
	return new Post(
		content,
		f_m.title ?? "Untitled",
		f_m.tags ?? [],
		name,
		f_m.published ?? "None",
		f_m.updated ?? f_m.published ?? "None",
		p,
		`/${p}/${name.replace(/\.md|\.mdx/, "")}`,
	);
};

const scheme_check =
	<T = unknown>() =>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	<S extends z.ZodType<T, any, any>>(arg: S) => {
		return arg;
	};

type Frontmatter = {
	title?: string;
	published?: string;
	updated?: string;
	tags?: string[];
};

const f_m_scheme = scheme_check<Frontmatter>()(
	z.object({
		title: z.string().optional(),
		published: z.string().optional(),
		updated: z.string().optional(),
		tags: z.array(z.string()),
	}),
);
