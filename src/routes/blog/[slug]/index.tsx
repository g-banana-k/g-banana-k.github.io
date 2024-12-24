// src/routes/blog/[postId]/index.tsx

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Article } from "~/components/article";
import { getDetail } from "~/system/microcms";

import styles from "./index.module.css";

export const usePostLoader = routeLoader$(async ({ params, status }) => {
    if (!params.slug) {
        throw new Error("slug is required");
    }

    try {
        const post = await getDetail(params.slug);
        return post;
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
			date={val.updatedAt}
			title={val.title}
			tags={[]}
            styles={styles}
            innerHTML={val.content}
		>
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