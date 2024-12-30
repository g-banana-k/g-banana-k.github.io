import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Account } from "~/components/common/account";
import { FlexSpace } from "~/components/ui/flex_space";
import { Text } from "~/components/ui/text";

const scratch = "/assets/scratch_s.svg";
const discord = "/assets/discord_white.svg";
const github = "/assets/github_white.svg";
const bluesky = "/assets/bsky.svg";

export const Accounts = component$(() => {
	return (
		<div class={styles.root}>
			<Text class={styles.title}>Accounts</Text>
			<div class={styles.container}>
				<Account
					link="https://scratch.mit.edu/users/g_banana_k"
					title="Scratch"
					name="@g_banana_k"
					class={styles.scratch}
					icon={scratch}
				/>
				<FlexSpace />
				<Account
					link="https://discord.com/users/834563592069447731"
					title="Discord"
					name="@g_banana_k"
					class={styles.discord}
					icon={discord}
				/>
				<FlexSpace />
				<Account
					link="https://github.com/g-banana-k"
					title="GitHub"
					name="@g-banana-k"
					class={styles.github}
					icon={github}
				/>
				<FlexSpace />
				<Account
					link="https://bsky.app/profile/g-banana-k.bsky.social"
					title="Bluesky"
					name="@g-banana-k"
					class={styles.bluesky}
					icon={bluesky}
				/>
			</div>
		</div>
	);
});
