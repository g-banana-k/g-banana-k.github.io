import styles from "./index.module.css";
import { FlexSpace } from "~/components/ui/flex_space";
import { Text } from "~/components/ui/text";
import { Component, component$ } from "@builder.io/qwik";
import {
	LuCode2,
	LuFootprints,
	LuStickyNote,
	LuTwitter,
} from "@qwikest/icons/lucide";
export const Jump = component$(() => {
	return (
		<div class={styles.root}>
			<Button
				link="#coding"
				title="Coding"
				icon={LuCode2}
				class={styles.coding}
			/>
			<FlexSpace />
			<Button
				link="#blog"
				title="Blog"
				icon={LuStickyNote}
				class={styles.blog}
			/>
			<FlexSpace />
			<Button link="#sns" title="SNS" icon={LuTwitter} class={styles.sns} />
			<FlexSpace />
			<Button
				link="#history"
				title="History"
				icon={LuFootprints}
				class={styles.history}
			/>
		</div>
	);
});

const Button = component$<{
	link: string;
	title: string;
	class?: string;
	icon?: Component;
}>((props) => {
	return (
		<div class={`${styles.button} ${props.class ?? ""}`}>
			<a href={props.link}>
				{props.icon ? (
					<div class={styles.icon}>
						<props.icon />
					</div>
				) : (
					""
				)}
				<Text class={styles.title}>{props.title}</Text>
			</a>
		</div>
	);
});
