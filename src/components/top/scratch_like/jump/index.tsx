import { CodeXml, Footprints, Notebook, Twitter } from "lucide-static";
import type { FC } from "~/syzygy/core/fc";
import styles from "./index.module.css";
import { FlexSpace } from "~/components/ui/flex_space";
import { Raw } from "~/syzygy/preset/raw";
import { Text } from "~/components/ui/text";

export const Jump = () => {
    return (
        <div class={styles.root}>
            <Button
                link="#coding"
                title="Coding"
                icon={CodeXml}
                class={styles.coding}
            />
            <FlexSpace />
            <Button
                link="#blog"
                title="Blog"
                icon={Notebook}
                class={styles.blog}
            />
            <FlexSpace />
            <Button link="#sns" title="SNS" icon={Twitter} class={styles.sns} />
            <FlexSpace />
            <Button
                link="#history"
                title="History"
                icon={Footprints}
                class={styles.history}
            />
        </div>
    );
};

const Button: FC<{
    link: string;
    title: string;
    class?: string;
    icon?: string;
}> = (props) => {
    return (
        <div class={[styles.button, props.class ?? ""]}>
            <a href={props.link}>
                {props.icon ? (
                    <Raw class={styles.icon} content={props.icon} />
                ) : (
                    ""
                )}
                <Text class={styles.title}>{props.title}</Text>
            </a>
        </div>
    );
};
