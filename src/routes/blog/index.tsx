import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { get_list } from "~/system/cms_wrapper";
import { IndexPage } from "~/components/article/index_page";

export const useListLoader = routeLoader$(async () => {
	const contents = await get_list("blog");
	return contents;
});

export default component$(() => {
	const list = useListLoader();
	return <IndexPage path={[{ name: "Blog" }]} list={list.value} />;
});

export const head: DocumentHead = () => {
	return {
		title: "Blog | gBanaKnal's House",
		meta: [
			{
				name: "description",
				content: "Blog of gBanaKnal",
			},
		],
		links: [
			{
				rel:"icon",
				href:"/blinol.png"
			}
		]
	};
};
