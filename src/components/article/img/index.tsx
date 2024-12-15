import type { FC } from "~/syzygy/core/fc";
import styles from "./index.module.css";

export const Img: FC<{ src: string; alt?: string }> = (props) => (
    <img class={styles.img} src={props.src} alt={props.alt} />
);
