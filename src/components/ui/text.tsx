import type { FC } from "~/syzygy/core/fc";
import type { JSXElements } from "~/syzygy/jsx/types";

export const Text: FC<JSXElements["div"]> = (props) => {
    return <div {...props}>{props.children}</div>;
};
