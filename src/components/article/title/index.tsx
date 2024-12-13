import type { FC, withChildren } from "~/syzygy/core/fc";
import styles from "./index.module.css";
import { Tag, TagArea } from "~/components/common/tag";

export const Title: FC<
    {
        tags: { name: string; color: string }[];
    } & withChildren
> = (props) => {
    return (
        <div class={styles.root}>
            <h1 class={styles.title}>{props.children}</h1>
            <TagArea>
                {props.tags.map((tag) => (
                    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                    <Tag {...tag} />
                ))}
            </TagArea>
        </div>
    );
};
