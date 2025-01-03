import styles from "./index.module.css";
import { component$, Slot } from "@builder.io/qwik";

export const Tag = component$<{
	color: string;
	name: string;
	styles: CSSModuleClasses;
}>((props) => {
	return (
		<div class={`${styles.root} ${props.styles?.tag ?? ""}`} style={`background-color: ${props.color}`}>
			<a href={`/tag/${props.name}`}>{props.name}</a>
		</div>
	);
});

export const TagArea = component$((props) => {
	return (
		<div class={styles.area}>
			<Slot />
		</div>
	);
});
