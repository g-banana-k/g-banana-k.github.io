import styles from "./index.module.css";
import type { FC, withChildren } from "~/syzygy/core/fc";

export const GridView: FC<
    {
        class?: string;
    } & withChildren
> = (props) => {
    return (
        <div class={`${styles.root} ${props.class ?? ""}`}>
            {props.children}
        </div>
    );
};
