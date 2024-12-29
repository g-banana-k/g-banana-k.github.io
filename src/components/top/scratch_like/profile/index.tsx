import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Text } from "~/components/ui/text";

export const Profile = component$(() => {
	return (
		<div class={styles.root}>
			<Text class={styles.title}>About me</Text>
			<div class={styles.box}>
				gBanaKnalです。ばなくなとでも読んでください。
			</div>
		</div>
	);
});
