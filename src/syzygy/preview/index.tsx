import type { Node } from "~/syzygy/core/element";
import routes from "~/site/routes";
import { Router } from "./routing";

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
                (e as HTMLAnchorElement).href="javascript:void(0);"
                e.onclick = (e) => {
                    console.log(e);
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

console.log("hey");

const page = routes.get("index")!;

const rendering = render(page.body);

const body = document.body;

rendering(body);

window.routes = routes;

window.Router = Router;
