import type { FC, withChildren } from "~/syzygy/core/fc";
import styles from "./index.module.css";

export const Title: FC<withChildren> = (props) => {
    return <h1 class={styles.title}>{props.children}</h1>;
};
