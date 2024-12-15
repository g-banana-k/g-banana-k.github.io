import { Page } from "~/syzygy/core/page";
import type { ArticleData } from "../system/markdown";
import { Article } from "~/components/article";
import { Paragraph } from "~/components/article/paragraph";
import { Translate } from "../system/translate";

import styles from "./article.module.css";

export const article_page = (data: ArticleData) => {
    const t = new Translate(styles);
    const body = t.nodes(data.body.children);
    return new Page(
        <Article title={data.title} tags={data.tags}>
            {body}
        </Article>,
    );
};
