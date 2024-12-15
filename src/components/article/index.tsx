import styles from "./index.module.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/common/header";
import { Title } from "~/components/article/title";
import type { FC, withChildren } from "~/syzygy/core/fc";
import { tags } from "~/site/system/cms";

export const Article: FC<{ title: string; tags: string[] } & withChildren> = (
    props,
) => {
    return (
        <div id={styles.root}>
            <div id={styles.main}>
                <Header title="Articles (4)" />
                <div class={styles.article}>
                    <Title
                        tags={props.tags.map((tag) => ({
                            name: tag,
                            color: tags.get(tag) ?? "#000",
                        }))}
                        yyyy-mm-dd="2024-12-14"
                    >
                        {props.title}
                    </Title>
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    );
};
