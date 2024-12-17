import "~/site/global.css";

import styles from "./top.module.css";

import { ScratchLike } from "~/components/top/scratch_like";
import { Page } from "~/syzygy/core/page";
import { Footer } from "~/components/footer";
import { Content } from "~/components/top/contents";
import { CodeXml, Footprints, Notebook, Twitter } from "lucide-static";
import { Section } from "./system/markdown";

const coding_section = new Section(`TypeScriptとRustが主力。HTML/CSSも最低限書くことはできる。

最近はHaskellやPureScriptのようなゴリゴリの純粋関数型言語も気になっているものの、作りたいもので相性のよさそうなものが特にないため手を出せていない。

2022年にScratchをやめてから本腰を入れて作ろうとしたものはことごとく頓挫しており、ここ２年間で作り上げた物がないという非常によろしくない状態にある。

(特にフロントエンド系技術において)既存のフレームワークやライブラリを避け、毎回自己流で解決しようとしてしまう悪癖がある。最近になって多少は改善されてきたものの、少し障壁に当たっただけですぐ使用をあきらめたり、フレームワークの上にさらにオレオレライブラリを乗せてしまったりと課題は多い。
`)

const blog_section = new Section(`半年に1回くらいの頻度で作り直している。そのたびにまっさらに消しているので本当に記事がない。

[一覧はこちら。](/blog)`)

const sns_section = new Section("ひたすらTwitterでクソリプを飛ばす生活を１年くらいしていた。")

const history_section = new Section("2020年の夏にScratchで[@gold_banana_kingdom](https://scratch.mit.edu/users/gold_banana_kingdom)として活動を開始したのが全てのはじまり。")

export default new Page(
    <div id={styles.root}>
        <ScratchLike />
        <Content id="coding" icon={CodeXml} bg="var(--section_bg1)">
            {coding_section.translate(styles)}
        </Content>
        <Content id="blog" icon={Notebook} bg="var(--section_bg2)">
            {blog_section.translate(styles)}
        </Content>
        <Content id="SNS" icon={Twitter} bg="var(--section_bg3)">
            {sns_section.translate(styles)}
        </Content>
        <Content id="history" icon={Footprints} bg="var(--section_bg4)">
            {history_section.translate(styles)}
        </Content>
        <Footer />
    </div>,
);
