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
                <Title>gBanaKnalの読みを"ばなくな"にするか"じばなくなる"にするか</Title>
                <Heading level={2}>見出し2</Heading>
                <Paragraph>テキスト</Paragraph>
                <Heading level={3}>見出し3</Heading>
                <Paragraph>テキスト</Paragraph>
                <Heading level={4}>見出し4</Heading>
                <Paragraph>テキスト</Paragraph>
                <Heading level={5}>見出し5</Heading>
                <Paragraph>テキスト</Paragraph>
                <Heading level={6}>見出し6</Heading>
                <Paragraph>テキスト</Paragraph>
            </div>
        </div>
        <Footer />
    </div>,
);
