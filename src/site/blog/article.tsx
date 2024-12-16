import { Page } from "~/syzygy/core/page";
import type { ArticleData } from "../system/markdown";
import { Article } from "~/components/article";
import { Translate } from "../system/translate";

import styles from "./article.module.css";
import { blog } from "../system/cms";

const blog_size = blog.size();

export const article_page = (
    data: ArticleData,
    category: { name: string; link?: string },
) => {
    const t = new Translate(styles);
    const body = t.nodes(data.body.children);
    return new Page(
        <Article
            path={[category]}
            date={data.date}
            title={data.title}
            tags={data.tags}
        >
            {body}
        </Article>,
    );
};
