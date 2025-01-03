import gfm from "remark-gfm";
import { remark } from "remark";
import type { Root, Yaml } from "mdast";
import frontmatter from "remark-frontmatter";
import * as yaml from "js-yaml";

const parser = remark().use(frontmatter).use(gfm);

export const parse = <T = unknown>(md: string): [Root, T | undefined] => {
	const ast = parser.parse(md);
	const fm_yaml = ast.children.find((node) => node.type === "yaml");
	const fm = fm_yaml
		? (yaml.load((fm_yaml as unknown as Yaml).value) as T)
		: undefined;
	return [ast, fm];
};
