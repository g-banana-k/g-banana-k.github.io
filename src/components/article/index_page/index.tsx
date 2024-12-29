import styles from "./index.module.css";
import { component$, type NoSerialize } from "@builder.io/qwik";
import { GridView } from "~/components/common/grid_view";
import { Header } from "~/components/common/header";
import { Thumbnail } from "~/components/common/thumbnail";
import { Footer } from "~/components/footer";
import type { Post } from "~/system/cms_wrapper";

export const IndexPage = component$<{
	styles?: CSSModuleClasses;
	list: NoSerialize<Post>[];
	path?: { name: string; link?: string }[];
}>((props) => {
	return (
		<div id={props.styles?.root ?? styles.root}>
			<div id={props.styles?.main ?? styles.main}>
				<Header path={props.path} />
				<GridView>
					{props.list.map((data) => {
						return (
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							<Thumbnail title={data?.title ?? "Untitled"} link={data?.link} />
						);
					})}
				</GridView>
			</div>
			<Footer />
		</div>
	);
});
