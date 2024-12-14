import type { Element } from "~/syzygy/core/element";

export type FC<P extends Record<string, unknown>> = (
    props: P,
) => Element;

export type withChildren = { children?: Node[] | Node };
