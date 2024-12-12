import { Page } from "~/syzygy/core/page";

import styles from "./index.module.css";
import { GridView } from "~/components/common/grid_view";
import { Thumbnail } from "~/components/common/thumbnail";
import { Header } from "~/components/common/header";

const thumbnail = "/group_photo.png";

export default new Page(
    <div id={styles.root}>
        <div id={styles.main}>
            <Header title="Articles (4)" />
            <GridView>
                <Thumbnail title="Sample 1" img={thumbnail} />
                <Thumbnail title="Sample 2" />
                <Thumbnail title="Sample 3" />
                <Thumbnail title="Sample 4" />
            </GridView>
        </div>
    </div>,
);
