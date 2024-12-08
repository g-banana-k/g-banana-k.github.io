import "~/site/global.css";

import styles from "./top.module.css";

import { ScratchLike } from "~/components/top/scratch_like";
import { Page } from "~/syzygy/page";
import { Footer } from "~/components/footer";

export default new Page(
    <body>
        <div class={styles.root}>
            <ScratchLike />
            <Footer />
        </div>
    </body>,
);
