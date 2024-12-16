import { isArray } from "../util";
import type { HTMLElement, Node } from "~/syzygy/core/element";

export const Fragment = ({ children }: { children?: Node | Node[] }) => {
    if (children === undefined) return new FragmentC([]);
    if (isArray(children)) return new FragmentC(children);
    return new FragmentC([children]);
};

export type Fragment = FragmentC;

class FragmentC {
    children: Node[];
    constructor(children: Node[]) {
        this.children = children;
    }
    render() {
        let s = "";
        for (const node of this.children) {
            if (typeof node === "string") s += node;
            else s += node.render();
        }
        return s;
    }
    isHTMLElement(): this is HTMLElement {
        return false;
    }
}
