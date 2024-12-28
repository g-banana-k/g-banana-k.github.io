import styles from "./index.module.css";

import { GridView } from "~/components/common/grid_view";
import { Header } from "~/components/common/header";
import { Footer } from "~/components/footer";
import { Thumbnail } from "~/components/common/thumbnail";
import { component$, type NoSerialize } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { get_tagged_list, type Post } from "~/system/cms_wrapper";

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
        <div id={styles.root}>
            <div id={styles.main}>
                <Header path={[{ name: "Tag", link: "/tag/" }, { name: slug}]} />
                <GridView>
                    {list.map((data) => {
                        return (
                            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                            <Thumbnail
                                title={data?.title ?? "Untitled"}
                                link={`/blog/${data?.name ?? ""}`}
                            />
                        );
                    })}
                </GridView>
            </div>
            <Footer />
        </div>
    );
});
