import { Text } from "~/components/ui/text";
import styles from "./index.module.css";
import { component$ } from "@builder.io/qwik";

const icon = "/blinol.png";

export const Header = component$<{
	path?: { name: string; link?: string }[];
}>((props) => {
	return (
		<div class={styles.root}>
			<a href="/" class={styles.logo}>
				<div class={styles.icon}>
					<img src={icon} alt="gBanaKnal" />
				</div>
				<Text class={styles.name}>gBanaKnal</Text>
			</a>
			{(props.path ?? []).map(({ name, link }, i) => (
				<>
					<Text class={`${styles.name} ${styles.double_colon}`}>::</Text>
					<Text class={styles.name}>
						{link ? <a href={link}>{name}</a> : name}
					</Text>
				</>
			))}
		</div>
	);
});
