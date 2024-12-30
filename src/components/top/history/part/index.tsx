import { component$, Slot } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Text } from "~/components/ui/text";

export const Part = component$<{ time: string, title: string }>((props) => {
    return <div class={styles.root}>
        <div class={styles.vertical_line} />
        <div class={styles.title_outer}>
            <div class={styles.time}>{props.time}</div>
            <Text class={styles.title}>{props.title}</Text>
        </div>
        <div class={styles.main}><Slot /></div>
    </div>
})
