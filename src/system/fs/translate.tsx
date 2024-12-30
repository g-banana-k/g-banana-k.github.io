import hljs from "highlight.js";
import type { RootContent } from "mdast";
import { Heading } from "~/components/article/heading";
import { Paragraph } from "~/components/article/paragraph";
import { Img } from "~/components/article/img";
import { Raw } from "~/components/ui/raw";
import type { JSXOutput } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "~/components/article/code";

export class Translate {
	styles: Record<string, string>;
	constructor(styles: Record<string, string>) {
		this.styles = styles;
	}
	nodes(r: RootContent[]) {
		return r.map((e) => this.node(e));
	}
	node(e: RootContent) {
		switch (e.type) {
			case "blockquote": {
				return (
					<div class={this.styles.blockquote}>{this.nodes(e.children)}</div>
				);
			}
			case "break": {
				return <br />;
			}
			case "code": {
				const styles = this.styles;
				return (
					<CodeBlock
						lang={e.lang ?? undefined}
						code={e.value}
						styles={styles}
					/>
				);
			}
			case "definition":
				{
				}
				break;
			case "delete": {
				return <s class={this.styles.delete}>{this.nodes(e.children)}</s>;
			}
			case "emphasis": {
				return <em class={this.styles.italic}>{this.nodes(e.children)}</em>;
			}
			case "footnoteDefinition":
				{
				}
				break;
			case "footnoteReference":
				{
				}
				break;
			case "heading":
				{
					if (e.depth + 1 <= 4) {
						return (
							<Heading
								level={(e.depth + 1) as 2 | 3 | 4}
								class={this.styles[`h${e.depth + 1}`]}
							>
								{this.nodes(e.children)}
							</Heading>
						);
					}
				}
				break;
			case "html": {
				return <Raw innerHTML={e.value} />;
			}
			case "image": {
				return <Img src={e.url} alt={""} />;
			}
			case "imageReference":
				{
				}
				break;
			case "inlineCode": {
				const styles = this.styles;
				return <InlineCode code={e.value} styles={styles} />;
			}
			case "link": {
				return (
					<a href={e.url} class={this.styles.link}>
						{this.nodes(e.children)}
					</a>
				);
			}
			case "linkReference":
				{
				}
				break;
			case "list": {
				const children = this.nodes(e.children);
				if (e.ordered) return <ol class={this.styles.ol}>{children}</ol>;
				return <ul class={this.styles.ul}>{children}</ul>;
			}
			case "listItem": {
				if (e.children.length === 1 && e.children[0].type === "paragraph") {
					return (
						<li class={this.styles.li}>{this.nodes(e.children[0].children)}</li>
					);
				}
				return <li class={this.styles.li}>${this.nodes(e.children)}</li>;
			}
			case "paragraph": {
				return <Paragraph>{this.nodes(e.children)}</Paragraph>;
			}
			case "strong": {
				return (
					<strong class={this.styles.strong}>{this.nodes(e.children)}</strong>
				);
			}
			case "table": {
				const t_res: JSXOutput[] = [];
				const rows = e.children;
				let is_head_void = true;
				rows.forEach((row, i) => {
					const r_res: JSXOutput[] = [];
					row.children.forEach((cell, j) => {
						r_res.push(
							j === 0 || i === 0 ? (
								<th class={this.styles.th}>{this.nodes(cell.children)}</th>
							) : (
								<td class={this.styles.td}>{this.nodes(cell.children)}</td>
							),
						);
						if (i === 0) is_head_void &&= cell.children.length === 0;
					});
					if (i === 0) {
						if (!is_head_void)
							t_res.push(<thead class={this.styles.thead}>{r_res}</thead>);
					} else if (i < rows.length - 1) {
						t_res.push(<tbody class={this.styles.tbody}>{r_res}</tbody>);
					} else {
						t_res.push(<tfoot class={this.styles.tfoot}>{r_res}</tfoot>);
					}
				});
				return <table class={this.styles.table}>{t_res}</table>;
			}
			case "tableCell":
				{
				}
				break;
			case "tableRow":
				{
				}
				break;
			case "text": {
				const res = [];
				for (const p of e.value.split("\n")) {
					res.push(p);
					res.push(<br />);
				}
				res.pop();
				return res;
			}
			case "thematicBreak": {
				return <div class={this.styles.horizon} />;
			}
			case "yaml":
				{
				}
				break;
		}
		return "";
	}
}
