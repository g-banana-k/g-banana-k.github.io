import styles from "./index.module.css";
import { Tag, TagArea } from "~/components/common/tag";
import { component$, Slot } from "@builder.io/qwik";

export const Title = component$<{
	tags: { name: string; color: string }[];
	"yyyy-mm-dd": string;
}>((props) => {
	return (
		<div class={styles.root}>
			<div class={styles.date}>{props["yyyy-mm-dd"]}</div>
			<h1 class={styles.title}>
				<Slot />
			</h1>
			<TagArea>
				{props.tags.map((tag) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<Tag {...tag} />
				))}
			</TagArea>
		</div>
	);
});
