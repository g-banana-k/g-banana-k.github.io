import { Title } from "./title/index";
import { Profile } from "./profile/index";
import { Accounts } from "./accounts/index";
import { Featured } from "./featured/index";
import { Jump } from "./jump/index";
import styles from "./index.module.css";

export const ScratchLike = () => {
    return (
        <div class={styles.root}>
            <Title />
            <div class={styles.contents}>
                <Profile />
                <Featured />
                <Accounts />
            </div>
            <Jump />
        </div>
    );
};
