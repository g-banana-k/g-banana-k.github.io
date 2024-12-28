import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { get_list } from "~/system/cms_wrapper";
import { IndexPage } from "~/components/article/index_page";

export const useListLoader = routeLoader$(async () => {
	const contents = await get_list("info");
	return contents;
});

export default component$(() => {
	const list = useListLoader();
	return (
		<IndexPage
			path={[{ name: "Info" }]}
			list={list.value}
		/>
	);
});
