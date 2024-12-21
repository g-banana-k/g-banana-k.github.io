import styles from "./index.module.css";

import { GridView } from "~/components/common/grid_view";
import { Header } from "~/components/common/header";
import { Footer } from "~/components/footer";
import { Thumbnail } from "~/components/common/thumbnail";
import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div id={styles.root}>
            <div id={styles.main}>
                <Header path={[{ name: "Blog" }]} />
                <GridView>{""
                }</GridView>
            </div>
            <Footer />
        </div>
    );
});
