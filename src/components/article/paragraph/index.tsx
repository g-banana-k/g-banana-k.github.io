import type { Component } from "@builder.io/qwik";
import styles from "./index.module.css";

export const Paragraph: Component = (props) => {
	return (
		<p class={styles.paragraph}>
			{props.children}
		</p>
	);
};
