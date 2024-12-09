import type { Element, Node } from "~/syzygy/element";
import type { Page } from "../page";
import routes from "~/site/routes";

type Rendering = (e: HTMLElement) => void;

type Render = (node: Node) => Rendering;

export const render: Render = (node) => {
    if (typeof node === "string")
        return (e: HTMLElement) => e.insertAdjacentText("beforeend", node);
    const children = node.children;
    const e = document.createElement(node.tag);
    for (const [tag, val] of node.props.entries()) {
        if (tag === "class") e.className = `${val}`;
        e[tag as unknown as "id"] = `${val}`;
    }
    if (node.innerHTML) e.innerHTML = node.innerHTML;
    else
        for (const child of children) {
            const rendering = render(child);
            rendering(e);
        }
    return (f: HTMLElement) => f.insertAdjacentElement("beforeend", e);
};

console.log("hey");

const page = routes.get("index")!;

const rendering = render(page.body);

const body = document.body;

rendering(body);
