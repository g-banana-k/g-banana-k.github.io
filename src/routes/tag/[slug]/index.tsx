import { component$, type NoSerialize } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { get_tagged_list, type Post } from "~/system/cms_wrapper";
import { IndexPage } from "~/components/article/index_page";

export const useTaggedListLoader = routeLoader$(async ({ params, status }) => {
	if (!params.slug) {
		throw new Error("slug is required");
	}
	const contents = await get_tagged_list(params.slug);
	return [contents, params.slug] as [NoSerialize<Post>[], string];
});

export default component$(() => {
	const [list, slug] = useTaggedListLoader().value;
	return (
		<IndexPage
			path={[{ name: "Tag", link: "/tag/" }, { name: slug }]}
			list={list}
		/>
	);
});

// 動的にheadを書き換える
export const head: DocumentHead = ({ resolveValue }) => {
	const [_, slug] = resolveValue(useTaggedListLoader);
	return {
		title: `${slug} | gBanaKnal's House`,
		meta: [
			{
				name: "description",
				content: `Posts with '${slug}' tag`,
			},
		],
	};
};
