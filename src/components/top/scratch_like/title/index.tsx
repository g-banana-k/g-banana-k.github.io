import { Raw } from "~/syzygy/preset/raw";
import styles from "./index.module.css";
import { Text } from "~/components/ui/text";

const icon = "/blinol.png";

export const Title = () => {
    return (
        <div class={styles.root}>
            <div class={styles.icon}>
                <img src={icon} alt="gBanaKnal" />
            </div>
            <div class={styles.name_area}>
                <Text class={styles.name}>gBanaKnal</Text>
                <Text class={styles.aka}>ばなくな</Text>
                <Raw
                    tag="script"
                    innerHTML={String.raw`{
    const element = document.querySelector(".${styles.aka}");
    element.innerText = ["ばなくな", "じばなくなる","ばなな","ばなへき","ごばなきなる","がばなな","ごばなな"][Math.floor(Math.random()*7)];
}`}
                />
            </div>
        </div>
    );
};
