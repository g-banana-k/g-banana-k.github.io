import { Text } from "~/components/ui/text";
import styles from "./index.module.css";
import type { FC } from "~/syzygy/core/fc";

export const Thumbnail: FC<{
    title: string;
    height?: string;
    img?: string;
    link?: string;
    date?: string;
}> = (props) => {
    return (
        <div class={styles.root} style={`height: ${props.height ?? 240}px`}>
            <a href={props.link}>
                <div class={styles.description}>
                <Text>{props.title}</Text>
                </div>
                <div class={styles.main}>
                    {props.img ? (
                        <img src={props.img} alt={props.img} />
                    ) : (
                        <Text>{props.title}</Text>
                    )}
                </div>
            </a>
        </div>
    );
};
