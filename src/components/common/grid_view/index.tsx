import { component$, Slot } from "@builder.io/qwik";
import styles from "./index.module.css";

export const GridView = component$<{
	class?: string;
}>((props) => {
	return (
		<div class={`${styles.root} ${props.class ?? ""}`}>
			<Slot />
		</div>
	);
});
