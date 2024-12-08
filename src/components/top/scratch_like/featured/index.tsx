import styles from "./index.module.css";
import { Text } from "~/components/ui/text";

export const Featured = () => {
    return (
        <div class={styles.root}>
            <Text class={styles.title}>Featured Project</Text>
            <Main />
        </div>
    );
};

const Main = () => {
    return (
        <div class={styles.container}>
            <div class={styles.alt}>
                <Text>コンテンツなし</Text>
            </div>
        </div>
    );
};
