import { Page } from "~/syzygy/core/page";

import styles from "./index.module.css";
import { GridView } from "~/components/common/grid_view";
import { Thumbnail } from "~/components/common/thumbnail";
import { Header } from "~/components/common/header";
import { Footer } from "~/components/footer";
import { blog } from "../system/cms";
import type { Node } from "~/syzygy/core/element";

const contents: Node[] = [];

blog.forEach((page, _, full_key) => {
    contents.push(
        <Thumbnail
            title={page.title}
            img={page.thumbnail}
            link={`/blog/${full_key}`}
        />,
    );
});

export default new Page(
    <div id={styles.root}>
        <div id={styles.main}>
            <Header path={[{ name: "Articles" }]} />
            <GridView>{contents}</GridView>
        </div>
        <Footer />
    </div>,
);
