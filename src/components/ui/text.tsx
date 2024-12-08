import type { FC } from "~/syzygy/fc";
import type { JSXElements } from "~/syzygy/jsx/type";

export const Text: FC<JSXElements["div"]> = (props) => {
    return <div {...props}>{props.children}</div>;
};
