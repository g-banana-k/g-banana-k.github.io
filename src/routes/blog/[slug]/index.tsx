import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Article } from "~/components/article";
import styles from "./index.module.css";
import { get_content } from "~/system/cms_wrapper";

export const usePostLoader = routeLoader$(async ({ params, status }) => {
	if (!params.slug) {
		throw new Error("slug is required");
	}

	try {
		return get_content("blog", params.slug);
	} catch {
		status(404);
	}
});

export default component$(() => {
	const post = usePostLoader();

	if (!post.value) {
		return <h1>Not Found.</h1>;
	}

	const val = post.value;

	return (
		<Article
			path={[{ name: "Blog", link: "/blog" }]}
			date={val.updated}
			title={val.title}
			tags={[]}
			styles={styles}
		>
			<val.content />
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
