import type { FC, withChildren } from "~/syzygy/core/fc";
import styles from "./index.module.css";
import { Raw } from "~/syzygy/preset/raw";

export const Content: FC<
    {
        id: string
        icon: string;
        bg: string;
    } & withChildren
> = (props) => {
    return (
        <div id={props.id} class={styles.root} style={`background-color: ${props.bg}`}>
            <Raw class={styles.icon} innerHTML={props.icon} />
            <div class={styles.main}>{props.children}</div>
        </div>
    );
};
