import { Root, RootContent } from "mdast";
import parseMD from "parse-md"
import { remark } from "remark";
import gfm from "remark-gfm";
import { MetaDataRaw, MetaData } from "../metadata/main.js";

export const read = async (code: string): Promise<[string, MetaData]> => {
    const parse_res = parseMD(code);
    const content = parse_res.content;
    const metadata = parse_res.metadata as unknown as MetaDataRaw;
    const r = await remark().use(gfm).parse(content);
    const html = translate_all(r.children);
    return [html, new MetaData(metadata)]
}

export const translate_all = (root: RootContent[]) => {
    let res = "";
    root.forEach(e => { res += translate(e) });
    return res;
}

export const translate = (e: RootContent) => {
    switch (e.type) {
        case "blockquote": {
            return `<div class="blockquote">${translate_all(e.children)}</div>`;
        } break;
        case "break": {
            return `<br></br>`
        } break;
        case "code": {
            return `<div class="code">${e.value}</div>`;
        } break;
        case "definition": { } break;
        case "delete": {
            return `<s>${translate_all(e.children)}</s>`
        } break;
        case "emphasis": {
            return `<em>${translate_all(e.children)}</em>`
        } break;
        case "footnoteDefinition": { } break;
        case "footnoteReference": { } break;
        case "heading": {
            return `<h${e.depth + 1}>${translate_all(e.children)}</h${e.depth + 1}>`
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
            return `<a href="${e.url}">${translate_all(e.children)}</a>`
        } break;
        case "linkReference": { } break;
        case "list": {
            const kind = e.ordered ? "ol" : "ul";
            return `<${kind}>${translate_all(e.children)}</${kind}>`
        } break;
        case "listItem": {
            if( e.children.length===1 && e.children[0].type==="paragraph") {
                return  `<li>${translate_all(e.children[0].children)}</li>`
            }
            return `<li>${translate_all(e.children)}</li>`
        } break;
        case "paragraph": {
            return `<p>${translate_all(e.children)}</p>`
        } break;
        case "strong": {
            return `<strong>${translate_all(e.children)}</strong>`
        } break;
        case "table": {
            let t_res = "";
            const rows = e.children;
            rows.forEach((row, i) => {
                if (i === 0) {
                    t_res += `<thead>${translate_all(row.children)}</thead>`
                } else if (i < rows.length - 1) {
                    t_res += `<tbody>${translate_all(row.children)}</tbody>`
                } else {
                    t_res += `<tfoot>${translate_all(row.children)}</tfoot>`
                }
            });
            return `<table>${t_res}</table>`
        } break;
        case "tableCell": {
            return `<tr>${translate_all(e.children)}</tr>`
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
