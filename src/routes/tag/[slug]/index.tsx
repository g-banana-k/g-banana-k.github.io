import { component$ } from "@builder.io/qwik";
import {
	type DocumentHead,
	routeLoader$,
	type StaticGenerateHandler,
} from "@builder.io/qwik-city";
import {
	get_tag_list,
	get_tagged_list,
	Post,
	type PostJson,
} from "~/system/cms_wrapper";
import { IndexPage } from "~/components/article/index_page";

export const useTaggedListLoader = routeLoader$(async ({ params, status }) => {
	if (!params.slug) {
		throw new Error("slug is required");
	}
	const contents = await get_tagged_list(params.slug);
	return [contents, params.slug] as [PostJson[], string];
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
		links: [
			{
				rel:"icon",
				href:"/blinol.png"
			}
		]
	};
};

export const onStaticGenerate: StaticGenerateHandler = async () => {
	const list = await get_tag_list();
	const paths = list.map((post) => post.name);
	return {
		params: paths.map((slug) => {
			return { slug };
		}),
	};
};
