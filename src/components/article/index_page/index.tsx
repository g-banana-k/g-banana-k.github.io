import styles from "./index.module.css";
import { component$ } from "@builder.io/qwik";
import { GridView } from "~/components/common/grid_view";
import { Header } from "~/components/common/header";
import { Thumbnail } from "~/components/common/thumbnail";
import { Footer } from "~/components/footer";
import { Post, type PostJson } from "~/system/cms_wrapper";

export const IndexPage = component$<{
	styles?: CSSModuleClasses;
	list: PostJson[];
	path?: { name: string; link?: string }[];
}>((props) => {
	return (
		<div id={props.styles?.root ?? styles.root}>
			<div id={props.styles?.main ?? styles.main}>
				<Header path={props.path} />
				<GridView>
					{props.list.map((data) => {
						const d = Post.from_json(data);
						return (
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							<Thumbnail title={d.title ?? "Untitled"} link={d.link} />
						);
					})}
				</GridView>
			</div>
			<Footer />
		</div>
	);
});
