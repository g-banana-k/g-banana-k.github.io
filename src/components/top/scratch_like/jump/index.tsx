import styles from "./index.module.css";
import { FlexSpace } from "~/components/ui/flex_space";
import { Text } from "~/components/ui/text";
import { component$ } from "@builder.io/qwik";
import { Raw } from "~/components/ui/raw";
import { Briefcase, CodeXml, Footprints, Notebook } from "lucide-static";

export const Jump = component$(() => {
	return (
		<div class={styles.root}>
			<Button
				link="#skills"
				title="Skills"
				icon={CodeXml}
				class={styles.coding}
			/>
			<FlexSpace />
			<Button link="#works" title="Works" icon={Briefcase} class={styles.works} />
			<FlexSpace />
			<Button link="#blog" title="Blog" icon={Notebook} class={styles.blog} />
			<FlexSpace />
			<Button
				link="#history"
				title="History"
				icon={Footprints}
				class={styles.history}
			/>
		</div>
	);
});

const Button = component$<{
	link: string;
	title: string;
	class?: string;
	icon?: string;
}>((props) => {
	return (
		<div class={`${styles.button} ${props.class ?? ""}`}>
			<a href={props.link}>
				{props.icon ? <Raw class={styles.icon} innerHTML={props.icon} /> : ""}
				<Text class={styles.title}>{props.title}</Text>
			</a>
		</div>
	);
});
