import { Text } from "~/components/ui/text";
import styles from "./index.module.css";
import type { FC } from "~/syzygy/core/fc";

const icon = "/blinol.png";

export const Header: FC<{ title: string }> = (props) => {
    return (
        <div class={styles.root}>
            <a href="/">
                <div class={styles.icon}>
                    <img src={icon} alt="gBanaKnal" />
                </div>
                <Text class={styles.name}>gBanaKnal</Text>
            </a>
            <Text class={[styles.name, styles.double_colon]}>::</Text>
            <Text class={styles.name}>{props.title}</Text>
        </div>
    );
};
