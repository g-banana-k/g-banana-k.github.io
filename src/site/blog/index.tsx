import { Page } from "~/syzygy/core/page";

import styles from "./index.module.css";
import { GridView } from "~/components/common/grid_view";
import { Thumbnail } from "~/components/common/thumbnail";

export default new Page(
    <div id={styles.root}>
        <div id={styles.main}>
            <GridView>
                <Thumbnail title="heya" />
            </GridView>
        </div>
    </div>,
);
