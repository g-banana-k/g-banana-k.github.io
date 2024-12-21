import { Title } from "./title/index";
import { Profile } from "./profile/index";
import { Accounts } from "./accounts/index";
import { Featured } from "./featured/index";
import { Jump } from "./jump/index";
import styles from "./index.module.css";
import { component$ } from "@builder.io/qwik";

export const ScratchLike = component$(() => {
	return (
		<div class={styles.root}>
			<Title />
			<div class={styles.contents}>
				<Profile />
				<Featured />
				<Accounts />
			</div>
			<Jump />
		</div>
	);
});
