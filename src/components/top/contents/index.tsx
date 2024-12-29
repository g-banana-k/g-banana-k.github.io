import { component$, type JSXChildren, Slot } from "@builder.io/qwik";
import styles from "./index.module.css";

export const Content = component$<{
	id: string;
	icon: JSXChildren;
	bg: string;
}>((props) => {
	return (
		<div
			id={props.id}
			class={styles.root}
			style={`background-color: ${props.bg}`}
		>
			<div class={styles.icon}>{props.icon}</div>
			<div class={styles.main}>
				<Slot />
			</div>
		</div>
	);
});
