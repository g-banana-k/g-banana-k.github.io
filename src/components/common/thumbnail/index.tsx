import { Text } from "~/components/ui/text";
import styles from "./index.module.css";
import { component$ } from "@builder.io/qwik";

export const Thumbnail = component$<{
	title: string;
	height?: string;
	img?: string;
	link?: string;
}>((props) => {
	return (
		<div class={styles.root} style={`height: ${props.height ?? 240}px`}>
			<a href={props.link}>
				<div class={styles.description}>
					<Text class={styles.main_description}>{props.title}</Text>
					{props.link ? (
						<Text class={styles.sub_description}>{props.link}</Text>
					) : (
						""
					)}
				</div>
				<div class={styles.main}>
					{props.img ? (
						<img src={props.img} alt={props.img} />
					) : (
						<Text>{props.title}</Text>
					)}
				</div>
			</a>
		</div>
	);
});
