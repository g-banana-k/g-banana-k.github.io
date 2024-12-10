import { isArray } from "../util"
import type { HTMLElement, Node } from "~/syzygy/core/element";

export const FragmentC = ({ children }: { children: Node | Node[] }) => {
    if (isArray(children)) return new Fragment(children);
    return new Fragment([children]);
}

export class Fragment {
    children: Node[];
    constructor(children: Node[]) {
        this.children = children;
    }
    render() {
        let s = "";
        for (const node of this.children) {
            if (typeof node === "string") s+=node;
            else s += node.render();
        }
        return s;
    }
    isHTMLElement(): this is HTMLElement {
        return false;
    }
}