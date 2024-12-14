import styles from "./index.module.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/common/header";
import { Title } from "~/components/article/title";
import type { FC, withChildren } from "~/syzygy/core/fc";

export const Article: FC<{title: string} & withChildren> = (props) => {
    return (
        <div id={styles.root}>
            <div id={styles.main}>
                <Header title="Articles (4)" />
                <div class={styles.article}>
                    <Title
                        tags={[
                            { color: "hsl(0, 100%, 90%)", name: "sample1" },
                            { color: "hsl(120, 100%, 90%)", name: "sample1" },
                            { color: "hsl(240, 100%, 90%)", name: "sample1" },
                        ]}
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
