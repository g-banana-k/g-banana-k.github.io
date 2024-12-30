import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { get_list } from "~/system/cms_wrapper";
import { IndexPage } from "~/components/article/index_page";

export const useListLoader = routeLoader$(async () => {
	const contents = await get_list("sludgetale");
	return contents;
});

export default component$(() => {
	const list = useListLoader();
	return <IndexPage path={[{ name: "SLUDGETALE" }]} list={list.value} />;
});

export const head: DocumentHead = () => {
	return {
		title: "SLUDGETALE | gBanaKnal's House",
		meta: [
			{
				name: "description",
				content: "Article list of SLUDGETALE",
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
