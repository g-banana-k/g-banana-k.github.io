import { HTMLElement } from "~/syzygy/core/element";
import type { JSXElements } from "../jsx/types";

export const Raw = (props: { content: string, tag?: string } & JSXElements["div"]) => {
    let className = "";
    if (typeof props.class === "string") className = props.class;
    else if (typeof props.class === "object") className = props.class.join(" ");
    const props_map = new Map<string, number | string>();
    for (const prop in props) {
        if (prop === "content" || prop === "tag" || prop === "children") continue;
        if (prop === "class") props_map.set("class", className);
        else if ((props as never)[prop] !== undefined)
            props_map.set(prop, (props as never)[prop] as string | number);
    }
    if (props.id) props_map.set("id", props.id);
    return new HTMLElement(props.tag ?? "div", props_map, [], props.content);
};
