import styles from "./index.module.css";
import { Text } from "~/components/ui/text";

export const Profile = () => {
    return (
        <div class={styles.root}>
            <Text class={styles.title}>About me</Text>
            <div class={styles.box}>
                gBanaKnalです。
                <br />
                読みは決めてないので適当に呼んでください。
                <br />
            </div>
        </div>
    );
};
