import styles from "./index.module.css";

import { Header } from "~/components/common/header";
import { Footer } from "~/components/footer";
import { component$ } from "@builder.io/qwik";
import {
	type DocumentHead,
	routeLoader$,
	type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { get_tag_list } from "~/system/cms_wrapper";
import { LargeTag, TagView } from "~/components/tag_list";

export const useTagListLoader = routeLoader$(async () => {
	const contents = await get_tag_list();
	return contents;
});

export default component$(() => {
	const list = useTagListLoader();
	const val = list.value;
	return (
		<div id={styles.root}>
			<div id={styles.main}>
				<Header path={[{ name: "Tag" }]} />
				<TagView>
					{val.map(({ color, name, pages }) => (
						<LargeTag color={color} name={name} pages={pages} />
					))}
				</TagView>
			</div>
			<Footer />
		</div>
	);
});

// 動的にheadを書き換える
export const head: DocumentHead = () => {
	return {
		title: "Tags | gBanaKnal's House",
		meta: [
			{
				name: "description",
				content: "Tags of gBanaKnal",
			},
		],
	};
};
