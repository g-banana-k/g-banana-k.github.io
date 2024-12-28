import styles from "./index.module.css"
import { component$, Slot } from "@builder.io/qwik";

export const LargeTag = component$<{
	color: string;
	name: string;
	pages: number;
}>((props) => {
	return (
		<div class={styles.tag} style={`background-color: ${props.color}`}>
			<a href={`/tags/${props.name}`}>{`${props.name} (${props.pages})`}</a>
		</div>
	);
});

export const TagView = component$((props) => {
	return (
		<div class={styles.view}>
			<h1 class={styles.title}>
				Tags
			</h1>
			<div class={styles.main}>
				<Slot />
			</div>
		</div>
	);
});
