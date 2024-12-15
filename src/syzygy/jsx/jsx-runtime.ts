import type { FC } from "~/syzygy/core/fc";
import type { Element, Node } from "~/syzygy/core/element";
import { HTMLElement } from "~/syzygy/core/element";
import { isArray } from "../util";

const jsx = (
    tag: string | FC<Record<string, unknown>>,
    {
        children,
        id,
        ...props
    }: {
        children?: Node[] | Node;
        class?: string | string[];
        id?: string;
    } & Record<string, unknown>,
): Element => {
    if (children === undefined) return jsx(tag, { children: [], id, ...props });
    if (!isArray<Node>(children))
        return jsx(tag, { children: [children], id, ...props });
    if (typeof tag === "function")
        return tag({ children: children, id, ...props });
    let className = "";
    if (typeof props.class === "string") className = props.class;
    else if (typeof props.class === "object") className = props.class.join(" ");
    const props_map = new Map<string, number | string>();
    for (const prop in props) {
        if (prop === "class") props_map.set("class", className);
        else if (props[prop] !== undefined)
            props_map.set(prop, props[prop] as string | number);
    }
    if (id) props_map.set("id", id);

    return new HTMLElement(tag, props_map, children.flat(1));
};

const jsxs = jsx;

export { jsx, jsxs };
export { Fragment } from "~/syzygy/core/fragment";
export type { JSX } from "./types";
