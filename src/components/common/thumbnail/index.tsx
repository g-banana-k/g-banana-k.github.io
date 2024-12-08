import { Text } from "~/components/ui/text";
import styles from "./index.module.css";
import type { FC } from "~/syzygy/fc";

export const Thumbnail: FC<{
    title: string;
    height?: string;
}> = (props) => {
    return (
        <div class={styles.root} style={`height: ${props.height ?? 240}px`}>
            <div class={styles.title}>
                <Text>{props.title}</Text>
            </div>
        </div>
    );
};
