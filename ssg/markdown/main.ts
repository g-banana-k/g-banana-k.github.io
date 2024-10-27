import { Root, RootContent } from "mdast";
import parseMD from "parse-md"
import { remark } from "remark";
import gfm from "remark-gfm";
import { MetaDataRaw, MetaData } from "../metadata/main.js";

export const read = async (code: string, pages: Map<string, unknown>, r_path: string): Promise<[string, MetaData]> => {
    const parse_res = parseMD(code);
    const content = parse_res.content;
    const metadata = parse_res.metadata as unknown as MetaDataRaw;
    const r = await remark().use(gfm).parse(content);
    const html = translate_all(r.children, pages);
    return [html, new MetaData(metadata, r_path)]
}

export const translate_all = (root: RootContent[], pages: Map<string, unknown>) => {
    let res = "";
    root.forEach(e => { res += translate(e, pages) });
    return res;
}

export const translate = (e: RootContent, pages: Map<string, unknown>) => {
    switch (e.type) {
        case "blockquote": {
            return `<div class="blockquote">${translate_all(e.children, pages)}</div>`;
        } break;
        case "break": {
            return `<br></br>`
        } break;
        case "code": {
            return `<div class="code">${e.value}</div>`;
        } break;
        case "definition": { } break;
        case "delete": {
            return `<s>${translate_all(e.children, pages)}</s>`
        } break;
        case "emphasis": {
            return `<em>${translate_all(e.children, pages)}</em>`
        } break;
        case "footnoteDefinition": { } break;
        case "footnoteReference": { } break;
        case "heading": {
            return `<h${e.depth + 1}>${translate_all(e.children, pages)}</h${e.depth + 1}>`
        } break;
        case "html": {
            return e.value;
        } break;
        case "image": {
            return `<div class="img_outer"><img src="${e.url}"></div>`
        } break;
        case "imageReference": { } break;
        case "inlineCode": {
            return `<span class="inline_code">${e.value}</span>`;
        } break;
        case "link": {
            const canon = e.url.slice(1).replace(/\/$/, "")
            const is_404 = !pages.has(canon);
            const url = e.url[0] === "/" ? e.url.replace(/(\.md\/|\.md|\.html\/|\.html)$/, '') : e.url;
            if (e.url[0] !== "/" || !is_404) return `<a href="${url}">${translate_all(e.children, pages)}</a>`
            return `<a href="${url}" class="link_404">${translate_all(e.children, pages)}</a>`
        } break;
        case "linkReference": { } break;
        case "list": {
            const kind = e.ordered ? "ol" : "ul";
            return `<${kind}>${translate_all(e.children, pages)}</${kind}>`
        } break;
        case "listItem": {
            if (e.children.length === 1 && e.children[0].type === "paragraph") {
                return `<li>${translate_all(e.children[0].children, pages)}</li>`
            }
            return `<li>${translate_all(e.children, pages)}</li>`
        } break;
        case "paragraph": {
            return `<p>${translate_all(e.children, pages)}</p>`
        } break;
        case "strong": {
            return `<strong>${translate_all(e.children, pages)}</strong>`
        } break;
        case "table": {
            let t_res = "";
            const rows = e.children;
            rows.forEach((row, i) => {
                if (i === 0) {
                    t_res += `<thead>${translate_all(row.children, pages)}</thead>`
                } else if (i < rows.length - 1) {
                    t_res += `<tbody>${translate_all(row.children, pages)}</tbody>`
                } else {
                    t_res += `<tfoot>${translate_all(row.children, pages)}</tfoot>`
                }
            });
            return `<table>${t_res}</table>`
        } break;
        case "tableCell": {
            return `<tr>${translate_all(e.children, pages)}</tr>`
        } break;
        case "tableRow": { } break;
        case "text": {
            return e.value;
        } break;
        case "thematicBreak": {
            return `<div class="horizon"></div>`
        } break;
        case "yaml": { } break;
    }
    return "";
}
