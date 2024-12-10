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
    }
    export type Element = SyzygyElement;
}

export type JSXElements = JSX.IntrinsicElements;

export { JSX };
export default JSX;