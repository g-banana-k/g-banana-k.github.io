import type { Node } from "~/syzygy/core/element";
import routes from "~/site/routes";
import { Router } from "./routing";
import { withChildren } from "../core/fc";

type Rendering = (e: HTMLElement) => void;

type Render = (node: Node) => Rendering;

export const render: Render = (node) => {
    if (typeof node === "string")
        return (e: HTMLElement) => e.insertAdjacentText("beforeend", node);
    if (!node.isHTMLElement()) {
        const children = node.children.map((node) => render(node));
        return (e: HTMLElement) => {
            for (const child of children) child(e);
        };
    }
    if (node.isHTMLElement()) {
        const children = node.children;
        const e = document.createElement(node.tag);
        for (const [tag, val] of node.props.entries()) {
            if (tag === "class") e.className = `${val}`;
            else if (node.tag === "a" && tag === "href") {
                (e as HTMLAnchorElement).href = "javascript:void(0);"
                e.onclick = (e) => {
                    console.log(e, val);
                    Router.locate(routes, val as string);
                };
            } else e[tag as unknown as "id"] = `${val}`;
        }
        if (node.innerHTML !== undefined) e.innerHTML = node.innerHTML!;
        else {
            for (const child of children) {
                const rendering = render(child);
                rendering(e);
            }
        }
        return (f: HTMLElement) => f.insertAdjacentElement("beforeend", e);
    }
    return 0 as never;
};

const body = document.body;

window.addEventListener("syzygy_rendering", (e) => {
    const rendering = render(e.detail.node);
    rendering(body);
})

Router.init(routes);

//import { FC } from "react"
//import { withChildren } from "../core/fc"
//const A: FC<withChildren> = ({children}) => {
//    return <div><a />{children}</div>
//}
//
//console.log(<A><div /><div /></A>)