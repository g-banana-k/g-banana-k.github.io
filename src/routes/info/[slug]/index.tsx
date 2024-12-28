import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Article } from "~/components/article";
import styles from "./index.module.css";
import { get_content, get_tags } from "~/system/cms_wrapper";

const usePostLoader = routeLoader$(async ({ params, status }) => {
	if (!params.slug) {
		throw new Error("slug is required");
	}

	try {
		return get_content("info", params.slug);
	} catch {
		status(404);
	}
});

const useTagsLoader = routeLoader$(async ({ params, status }) => {
	return get_tags();
});

export default component$(() => {
	const post = usePostLoader();
	const tags_map = useTagsLoader().value;

	if (!post.value) {
		return <h1>Not Found.</h1>;
	}

	const val = post.value;

	const tags = val.tags.map((name) => ({
		name,
		color: tags_map.get(name) ?? "hsl(0, 0%, 90%)",
	}));

	return (
		<Article
			path={[{ name: "Info", link: "/info" }]}
			date={val.updated}
			title={val.title}
			tags={tags}
			styles={styles}
		>
			{val.content}
		</Article>
	);
});

// 動的にheadを書き換える
export const head: DocumentHead = ({ resolveValue }) => {
	const post = resolveValue(usePostLoader);

	return {
		title: post?.title || "Welcome to Qwik",
		meta: [
			{
				name: "description",
				content: post?.title || "Qwik site description",
			},
		],
	};
};
