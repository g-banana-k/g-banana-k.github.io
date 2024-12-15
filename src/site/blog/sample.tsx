import { Article } from "~/components/article";
import { Heading } from "~/components/article/heading";
import { Paragraph } from "~/components/article/paragraph";
import { Page } from "~/syzygy/core/page";

export default new Page(
    <Article
        title={`gBanaKnalの読みを"ばなくな"にするか"じばなくなる"にするか`}
        tags = {["sample1"]}
    >
        <Paragraph>テキスト</Paragraph>
        <Heading level={2}>見出し2</Heading>
        <Paragraph>テキスト</Paragraph>
        <Heading level={3}>見出し3</Heading>
        <Paragraph>
            テキスト
            <br />
            テキスト
        </Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Heading level={4}>見出し4</Heading>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
        <Paragraph>テキスト</Paragraph>
    </Article>,
);
