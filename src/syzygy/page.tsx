import type { Element, Node } from "~/syzygy/element";
import type { FC, withChildren } from "~/syzygy/fc";

const HTMLHead: FC<HeadProps & withChildren> = ({
    children,
    stylesheets,
    lang,
}) => {
    return (
        <html lang={lang}>
            <head>
                {(stylesheets ?? []).map((s) => (
                    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                    <link rel="stylesheet" href={s} />
                ))}
            </head>
            <body>{children}</body>
        </html>
    );
};

type HeadProps = {
    lang?: string;
    stylesheets?: string[];
};

type HeadComponent = FC<withChildren>;

const default_props: HeadProps = {
    lang: "ja",
    stylesheets: ["/bundle.css"],
};

export class Page {
    body: Element;
    constructor(body: Node);
    constructor(body: Node, head: HeadProps);
    constructor(body: Node, head: HeadComponent, lang?: string);
    constructor(body: Node, head?: HeadProps | HeadComponent, lang?: string) {
        if (typeof head === "function") {
            const Head = head;
            this.body = (
                <html lang={lang}>
                    <Head>{body}</Head>
                </html>
            );
        } else if (typeof head === "object") {
            this.body = <HTMLHead {...head}>{body}</HTMLHead>;
        } else {
            this.body = <HTMLHead {...default_props}>{body}</HTMLHead>;
        }
    }
    render() {
        return this.body.render();
    }
}
