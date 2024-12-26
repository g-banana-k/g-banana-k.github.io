import type { Component } from "@builder.io/qwik";
import styles from "./index.module.css";

export const Img: Component<{ src: string; alt?: string }> = (props) => (
	<img class={styles.img} src={props.src} alt={props.alt} />
);
