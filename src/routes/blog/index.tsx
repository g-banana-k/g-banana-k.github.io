import styles from "./index.module.css";

import { GridView } from "~/components/common/grid_view";
import { Header } from "~/components/common/header";
import { Footer } from "~/components/footer";
import { Thumbnail } from "~/components/common/thumbnail";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { get_list } from "~/system/cms_wrapper";

export const useListLoader = routeLoader$(async () => {
	const contents = await get_list("blog");
	return contents;
});

export default component$(() => {
	const list = useListLoader();
	return (
		<div id={styles.root}>
			<div id={styles.main}>
				<Header path={[{ name: "Blog" }]} />
				<GridView>
					{
						// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
						list.value.map((data) => {
							return (
								<Thumbnail title={data.title} link={`/blog/${data.name}`} />
							);
						})
					}
				</GridView>
			</div>
			<Footer />
		</div>
	);
});
