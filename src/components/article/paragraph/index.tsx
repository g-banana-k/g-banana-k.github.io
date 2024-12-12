import type { FC, withChildren } from "~/syzygy/core/fc";
import styles from "./index.module.css";

export const Paragraph: FC<withChildren> = (props) => {
    return <p class={styles.paragraph}>{props.children}</p>;
};
