import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Raw } from "~/components/ui/raw";
import { Notebook } from "lucide-static";
import { Text } from "~/components/ui/text";
import { FlexSpace } from "~/components/ui/flex_space";
import { GridView } from "~/components/common/grid_view";
import { Post, type PostJson } from "~/system/cms_wrapper";
import { Thumbnail } from "~/components/common/thumbnail";

export const BlogSection = component$<{ contents: PostJson[] }>((props) => {
	return (
		<div
			id="blog"
			class={styles.root}
		>
			<div class={styles.title}>
				<FlexSpace />
				<Raw class={styles.icon} innerHTML={Notebook} />
				<Text class={styles.name}>Blog</Text>
				<FlexSpace />
			</div>
			<div class={styles.main} >
				<GridView>
					{props.contents.map((data) => {
						const d = Post.from_json(data);
						return (
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							<Thumbnail title={d.title ?? "Untitled"} link={d.link} />
						);
					})}
				</GridView>
			</div>
		</div>
	);
});
