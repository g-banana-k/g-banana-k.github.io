import { component$ } from "@builder.io/qwik";
import type {
	DocumentHead,
	StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Article } from "~/components/article";
import styles from "./index.module.css";
import { get_content, get_list, get_tags, Post } from "~/system/cms_wrapper";

const usePostLoader = routeLoader$(async ({ params, status }) => {
	if (!params.slug) {
		throw new Error("slug is required");
	}

	try {
		return get_content("sludgetale", params.slug);
	} catch {
		status(404);
	}
});

const useTagsLoader = routeLoader$(async ({ params, status }) => {
	return get_tags();
});

export default component$(() => {
	const post_raw = usePostLoader();
	const tags_map = useTagsLoader().value;

	if (!post_raw.value) {
		return <h1>Not Found.</h1>;
	}

	const post = Post.from_json(post_raw.value);

	const tags = post.tags.map((name) => ({
		name,
		color: tags_map.get(name) ?? "hsl(0, 0%, 90%)",
	}));

	return (
		<Article
			path={[{ name: "SLUDGETALE", link: "/sludgetale" }]}
			date={post.updated}
			title={post.title}
			tags={tags}
			styles={styles}
		>
			{post.jsx(styles)}
		</Article>
	);
});

export const head: DocumentHead = ({ resolveValue }) => {
	const post_raw = resolveValue(usePostLoader);

	const post: Partial<Post> = post_raw ? Post.from_json(post_raw) : {};

	return {
		title: `${post?.title ?? "Post"} | SLUDGETALE`,
		meta: [
			{
				name: "description",
				content: post?.title ?? "",
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

export const onStaticGenerate: StaticGenerateHandler = async () => {
	const list = (await get_list("sludgetale")).map((j) => Post.from_json(j));
	const paths = list.map((post) => post.name);
	return {
		params: paths.map((slug) => {
			return { slug };
		}),
	};
};
