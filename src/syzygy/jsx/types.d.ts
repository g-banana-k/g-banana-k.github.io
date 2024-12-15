import type { Node, Element as SyzygyElement } from "~/syzygy/core/element";
type styles = string;
type defaultProps = { class?: string | string[]; id?: string; style?: styles };
type hasChildren = { children?: Node[] | Node };

declare namespace JSX {
    export interface IntrinsicElements {
        div: defaultProps & hasChildren;
        img: defaultProps & { src: string; alt?: string };
        a: defaultProps & hasChildren & { href?: string };
        br: {};
        body: defaultProps & hasChildren;
        html: { lang?: string } & hasChildren;
        head: hasChildren;
        link: { rel: string; href: string };
        h1: defaultProps & hasChildren;
        h2: defaultProps & hasChildren;
        h3: defaultProps & hasChildren;
        h4: defaultProps & hasChildren;
        h5: defaultProps & hasChildren;
        h6: defaultProps & hasChildren;
        p: defaultProps & hasChildren;
        pre: defaultProps & hasChildren;
        code: defaultProps & hasChildren;
        s: defaultProps & hasChildren;
        em: defaultProps & hasChildren;
        ol: defaultProps & hasChildren;
        ul: defaultProps & hasChildren;
        li: defaultProps & hasChildren;
        strong: defaultProps & hasChildren;
        li: defaultProps & hasChildren;
        table: defaultProps & hasChildren;
        th: defaultProps & hasChildren;
        td: defaultProps & hasChildren;
        tfoot: defaultProps & hasChildren;
        tbody: defaultProps & hasChildren;
        thead: defaultProps & hasChildren;
    }
    export type Element = SyzygyElement;
}

export type JSXElements = JSX.IntrinsicElements;

export { JSX };
export default JSX;
