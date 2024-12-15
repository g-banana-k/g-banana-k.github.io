import gfm from "remark-gfm";
import { remark } from "remark";
import type { Root } from "mdast";
import frontmatter from "remark-frontmatter";
import * as yaml from "js-yaml";

export class ArticleData {
    date: `${number}-${number}-${number}` | "None";
    thumbnail?: string;
    title: string;
    tags: string[];
    body: Root;
    constructor(md: string, name: string) {
        if (name.length !== 8) throw Error(`date was unknown format: ${name}`);
        const [ast, fm] = parse(md);
        const date = (fm as { date?: string[] })?.date ?? (name.length === 8 && /^\d+$/.test(name) ? `${name.slice(0, 4)}-${name.slice(4, 6)}-${name.slice(6, 8)}` : "None")
        const tags = (fm as { tags?: string[] })?.tags ?? [];
        const title = (fm as { title?: string })?.title ?? "untitled";
        const thumbnail = (fm as { thumbnail?: string })?.thumbnail;
        this.date = date as `${number}-${number}-${number}` | "None";
        this.tags = tags;
        this.title = title;
        this.body = ast;
        this.thumbnail = thumbnail;
    }
};

const parser = remark().use(frontmatter).use(gfm);

const parse = (md: string): [Root, unknown] => {
    const ast = parser.parse(md);
    const fm_yaml = ast.children.find(node => node.type === "yaml")?.value;
    const fm = fm_yaml ? yaml.load(fm_yaml) : undefined;
    return [ast, fm]
}