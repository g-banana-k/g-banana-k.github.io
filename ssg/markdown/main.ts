import hljs from "highlight.js";
import { RootContent } from "mdast";
import parseMD from "parse-md"
import { remark } from "remark";
import gfm from "remark-gfm";
import { MetaDataRaw, MetaData } from "../metadata/main.js";

export type TranslateData = {
    used_langs: Set<string>;
}

export class Translate {
    used_langs: Set<string>;
    md: string;
    pages: Map<string, unknown>;
    r_path: string;
    constructor(code: string, pages: Map<string, unknown>, r_path: string) {
        this.md = code;
        this.pages = pages;
        this.r_path = r_path;
        this.used_langs = new Set();
    }
    async main(): Promise<[string, MetaData, TranslateData]> {
        const parse_res = parseMD(this.md);
        const content = parse_res.content;
        const metadata = parse_res.metadata as unknown as MetaDataRaw;
        const r = await remark().use(gfm).parse(content);
        if ("debug" in metadata) debug_log(r);
        const html = this.nodes(r.children);
        return [html, new MetaData(metadata, this.r_path), this.data()]
    }

    data(): TranslateData {
        return { used_langs: this.used_langs }
    }

    nodes(root: RootContent[]) {
        let res = "";
        root.forEach(e => { res += this.node(e) });
        return res;
    }

    node(e: RootContent) {
        switch (e.type) {
            case "blockquote": {
                return `<div class="blockquote">${this.nodes(e.children)}</div>`;
            } break;
            case "break": {
                return `<br></br>`
            } break;
            case "code": {
                const highlighted = e.lang ? hljs.highlight(e.value, { language: e.lang }) : hljs.highlightAuto(e.value);
                if (highlighted.language) this.used_langs.add(highlighted.language)
                return `<pre class="hljs"><code>${highlighted.value}</code></pre>`
            } break;
            case "definition": { } break;
            case "delete": {
                return `<s>${this.nodes(e.children)}</s>`
            } break;
            case "emphasis": {
                return `<em>${this.nodes(e.children)}</em>`
            } break;
            case "footnoteDefinition": { } break;
            case "footnoteReference": { } break;
            case "heading": {
                return `<h${e.depth + 1}>${this.nodes(e.children)}</h${e.depth + 1}>`
            } break;
            case "html": {
                return e.value;
            } break;
            case "image": {
                return `<div class="img_outer"><img src="${e.url}" ${e.alt ? `alt="${e.alt}"` : ""}></div>`
            } break;
            case "imageReference": { } break;
            case "inlineCode": {
                return `<code class="inline_code">${e.value}</code>`;
            } break;
            case "link": {
                const canon = e.url.slice(1).replace(/\/$/, "")
                const is_404 = !this.pages.has(canon);
                const url = e.url[0] === "/" ? e.url.replace(/(\.md\/|\.md|\.html\/|\.html)$/, '') : e.url;
                if (e.url[0] !== "/" || !is_404) return `<a href="${url}">${this.nodes(e.children)}</a>`
                return `<a href="${url}" class="link_404">${this.nodes(e.children)}</a>`
            } break;
            case "linkReference": { } break;
            case "list": {
                const kind = e.ordered ? "ol" : "ul";
                return `<${kind}>${this.nodes(e.children)}</${kind}>`
            } break;
            case "listItem": {
                if (e.children.length === 1 && e.children[0].type === "paragraph") {
                    return `<li>${this.nodes(e.children[0].children)}</li>`
                }
                return `<li>${this.nodes(e.children)}</li>`
            } break;
            case "paragraph": {
                return `<p>${this.nodes(e.children)}</p>`
            } break;
            case "strong": {
                return `<strong>${this.nodes(e.children)}</strong>`
            } break;
            case "table": {
                let t_res = "";
                const rows = e.children;
                let is_head_void = true;
                rows.forEach((row, i) => {
                    let r_res = "";
                    row.children.forEach((cell, j) => {
                        r_res += j === 0 || i === 0 ? `<th>${this.nodes(cell.children)}</th>` : `<td>${this.nodes(cell.children)}</td>`
                        if (i === 0) is_head_void &&= cell.children.length === 0;
                    })
                    if (i === 0) {
                        if (!is_head_void) t_res += `<thead>${r_res}</thead>`
                    } else if (i < rows.length - 1) {
                        t_res += `<tbody>${r_res}</tbody>`
                    } else {
                        t_res += `<tfoot>${r_res}</tfoot>`
                    }
                });
                return `<table>${t_res}</table>`
            } break;
            case "tableCell": { } break;
            case "tableRow": { } break;
            case "text": {
                return e.value.replace(/[&'`"<>]/g, c => ({
                    '&': '&amp;',
                    "'": '&#x27;',
                    '`': '&#x60;',
                    '"': '&quot;',
                    '<': '&lt;',
                    '>': '&gt;',
                })[c] ?? c);
            } break;
            case "thematicBreak": {
                return `<div class="horizon"></div>`
            } break;
            case "yaml": { } break;
        }
        return "";
    }
}

const debug_log = (o: any) => {
    console.log(to_string(o))
}

const to_string = (o: any) => {
    if (typeof o === "string") {
        return `"${o}"`
    } else if (typeof o === "number") {
        return `${o}`
    } else if (typeof o === "boolean") {
        return `${o}`
    } else if (typeof o === "bigint") {
        return `${o}`
    } else if (typeof o === "undefined") {
        return "undefined"
    } else if (o === null) {
        return "null"
    } else if (typeof o === "function") {
        return "Function"
    } else if (typeof o === "object") {
        let s = "";
        for (const key in o) {
            s += `${key}: ${to_string(o[key])}, `
        }
        return `{ ${s}}`
    } else return ""
}