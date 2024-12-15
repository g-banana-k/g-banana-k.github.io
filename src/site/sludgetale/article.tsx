import { Page } from "~/syzygy/core/page";
import type { ArticleData } from "../system/markdown";
import { Article } from "~/components/article";
import { Translate } from "../system/translate";

import styles from "./article.module.css";

export const article_page_st = (data: ArticleData) => {
    const t = new Translate(styles);
    const body = t.nodes(data.body.children);
    return new Page(
        <Article title={data.title} tags={data.tags}>
            {body}
        </Article>,{
            
    lang: "ja",
    stylesheets: [
        "https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css",
        "/fonts.css",
        "/bundle.css",
    ],
        }
    );
};
