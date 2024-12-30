import styles from "./index.module.css";

import { ScratchLike } from "~/components/top/scratch_like";
import { Footer } from "~/components/footer";
import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { SkillsSection } from "~/components/top/skills";
import { WorksSection } from "~/components/top/works";

import { get_list } from "~/system/cms_wrapper";
import { BlogSection } from "~/components/top/blog";

export const useListLoader = routeLoader$(async () => {
	const contents = await get_list("blog");
	return contents;
});


export default component$(() => {
	const contents = useListLoader().value;
	return (
		<div id={styles.root}>
			<ScratchLike />
			<SkillsSection />
			<WorksSection />
			<BlogSection contents={contents} />
			<Footer />
		</div>
	);
});

export const head: DocumentHead = () => {
	return {
		title: "gBanaKnal's House",
		meta: [
			{
				name: "description",
				content: "Site of gBanaKnal",
			},
		],
		links: [
			{
				rel:"icon",
				href:"/assets/blinol.png"
			}
		]
	};
};

