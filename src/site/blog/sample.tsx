import { Page } from "~/syzygy/core/page";

import styles from "./article.module.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/common/header";
import { Title } from "~/components/article/title";
import { Heading } from "~/components/article/heading";
import { Paragraph } from "~/components/article/paragraph";

export default new Page(
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
                >
                    gBanaKnalの読みを"ばなくな"にするか"じばなくなる"にするか
                </Title>
                <Paragraph>テキスト</Paragraph>
                <Heading level={2}>見出し2</Heading>
                <Paragraph>テキスト</Paragraph>
                <Heading level={3}>見出し3</Heading>
                <Paragraph>テキスト<br />テキスト</Paragraph>
                <Paragraph>テキスト</Paragraph>
                <Heading level={4}>見出し4</Heading>
                <Paragraph>テキスト</Paragraph>
            </div>
        </div>
        <Footer />
    </div>,
);
