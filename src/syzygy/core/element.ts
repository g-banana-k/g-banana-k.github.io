import type { Fragment } from "./fragment";

export class HTMLElement {
    tag: string;
    props: Map<string, string | number>;
    children: Node[];
    innerHTML?: string;
    constructor(
        tag: string,
        props: Map<string, string | number>,
        children: Node[],
        innerHTML?: string,
    ) {
        this.tag = tag;
        this.props = props;
        this.children = children;
        this.innerHTML = innerHTML;
    }
    render(): string {
        const children = this.children
            .map((n) => (typeof n === "string" ? html_escape(n) : n.render()))
            .join("");
        const props = this.props
            .entries()
            .map(([name, content]) => `${name}="${content}"`)
            .reduce((acc, c) => `${acc} ${c}`, "");
        if (this.innerHTML) {
            console.log(`<${this.tag}${props}>${this.innerHTML}</${this.tag}>`)
            return `<${this.tag}${props}>${this.innerHTML}</${this.tag}>`;
        }
        return `<${this.tag}${props}>${children}</${this.tag}>`;
    }
    isHTMLElement(): this is HTMLElement {
        return true;
    }
}

export type Node = Element | string;

export type Element = HTMLElement | Fragment;

const html_escape = (str: string): string =>
    str.replace(/[&<>"']/g, (match) => {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&apos;";
            default:
                return match;
        }
    });
