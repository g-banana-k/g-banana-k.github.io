import type { Element, Node } from "~/syzygy/core/element";
import type { FC, withChildren } from "~/syzygy/core/fc";

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
    stylesheets: [
        "https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css",
        "/bundle.css",
    ],
};

export class Page {
    body: Node;
    html: Element;
    constructor(body: Node);
    constructor(body: Node, head: HeadProps);
    constructor(body: Node, head: HeadComponent, lang?: string);
    constructor(body: Node, head?: HeadProps | HeadComponent, lang?: string) {
        this.body = body;
        if (typeof head === "function") {
            const Head = head;
            this.html = (
                <html lang={lang}>
                    <Head>{this.body}</Head>
                </html>
            );
        } else if (typeof head === "object") {
            this.html = <HTMLHead {...head}>{this.body}</HTMLHead>;
        } else {
            this.html = <HTMLHead {...default_props}>{this.body}</HTMLHead>;
        }
    }
    render() {
        return this.html.render();
    }
}
