import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Text } from "~/components/ui/text";

export const Featured = component$(() => {
	return (
		<div class={styles.root}>
			<Text class={styles.title}>Featured Project</Text>
			<Main />
		</div>
	);
});

const Main = component$(() => {
	return (
		<div class={styles.container}>
			<div class={styles.alt}>
				<Text>コンテンツなし</Text>
			</div>
		</div>
	);
});
