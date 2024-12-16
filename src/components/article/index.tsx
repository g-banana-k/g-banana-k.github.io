import styles from "./index.module.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/common/header";
import { Title } from "~/components/article/title";
import type { FC, withChildren } from "~/syzygy/core/fc";
import { tags } from "~/site/system/cms";

export const Article: FC<
    {
        path?: { name: string; link?: string }[];
        title: string;
        date: string;
        tags: string[];
    } & withChildren
> = (props) => {
    return (
        <div id={styles.root}>
            <div id={styles.main}>
                <Header path={props.path}/>
                <div class={styles.article}>
                    <Title
                        tags={props.tags.map((tag) => ({
                            name: tag,
                            color: tags.get(tag) ?? "hsl(0, 0%, 90%)",
                        }))}
                        yyyy-mm-dd={props.date}
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
