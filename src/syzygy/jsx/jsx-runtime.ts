import type { FC } from "~/syzygy/fc";
import type { Node } from "~/syzygy/element";
import { Element } from "~/syzygy/element";
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
) => {
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
    return new Element(tag, props_map, (children as Node[]) ?? []);
};

const jsxs = jsx;

export { jsx, jsxs };

export { JSX } from "~/syzygy/jsx/type";
