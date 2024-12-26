import { Slot, type Component } from "@builder.io/qwik";
import styles from "./index.module.css";

export const Paragraph: Component = () => {
    return <p class={styles.paragraph}><Slot /></p>;
};
