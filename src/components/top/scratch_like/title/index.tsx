import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Text } from "~/components/ui/text";
import icon from "/blinol.png";

export const Title = component$(() => {
	return (
		<div class={styles.root}>
			<div class={styles.icon}>
				<img src={icon} alt="gBanaKnal" />
			</div>
			<div class={styles.name_area}>
				<Text class={styles.name}>gBanaKnal</Text>
				<Text class={styles.aka}>ばなくな</Text>
			</div>
		</div>
	);
});
