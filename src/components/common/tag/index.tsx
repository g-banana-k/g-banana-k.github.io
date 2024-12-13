import type { FC, withChildren } from "~/syzygy/core/fc";
import styles from "./index.module.css";

export const Tag: FC<{
    color: string;
    name: string;
}> = (props) => {
    return (
        <div class={styles.root} style={`background-color: ${props.color}`}>
            {props.name}
        </div>
    );
};

export const TagArea: FC<withChildren> = (props) => {
    return <div class={styles.area}>{props.children}</div>;
};
