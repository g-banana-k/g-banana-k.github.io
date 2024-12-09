import type { Element, Node } from "~/syzygy/element"
import { Page } from "../page"

type Rendering = (e: HTMLElement) => void;

type Render = (node: Node) => Rendering;

export const render: Render = (node) => {
    if (typeof node === "string") return (e: HTMLElement) => e.insertAdjacentText("afterbegin", node);
    const children = node.children;
    const e = document.createElement(node.tag);
    for (const child of children) {
        const rendering = render(child);
        rendering(e);
    }
    return (f: HTMLElement) => f.insertAdjacentElement("afterbegin", e);
}
