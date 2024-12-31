import styles from "./index.module.css";
import { Tag, TagArea } from "~/components/common/tag";
import { component$, Slot } from "@builder.io/qwik";

export const Title = component$<{
	tags: { name: string; color: string }[];
	"yyyy-mm-dd": string;
	styles: CSSModuleClasses;
}>((props) => {
	return (
		<div class={styles.root}>
			<div class={props.styles.date ?? styles.date}>{props["yyyy-mm-dd"]}</div>
			<h1 class={props.styles.title ?? styles.title}>
				<Slot />
			</h1>
			<TagArea>
				{props.tags.map((tag) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<Tag styles={props.styles} name={tag.name} color={tag.color} />
				))}
			</TagArea>
		</div>
	);
});
