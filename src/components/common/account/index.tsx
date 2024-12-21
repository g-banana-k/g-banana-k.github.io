import { Text } from "~/components/ui/text";
import styles from "./index.module.css";
import { component$ } from "@builder.io/qwik";

export const Account = component$<{
	link: string;
	title: string;
	name: string;
	class?: string;
	icon?: string;
}>((props) => {
	return (
		<div class={`${styles.account} ${props.class ?? ""}`}>
			<a href={props.link}>
				<div class={styles.icon}>
					{props.icon !== undefined ? (
						<img src={props.icon} alt={`Icon of ${props.title}`} />
					) : (
						""
					)}
				</div>
				<Text class={styles.title}>{props.title}</Text>
				<Text class={styles.name}>{props.name} </Text>
			</a>
		</div>
	);
});
