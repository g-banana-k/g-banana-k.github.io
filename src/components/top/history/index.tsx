import { component$ } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Raw } from "~/components/ui/raw";
import { Footprints } from "lucide-static";
import { Text } from "~/components/ui/text";
import { FlexSpace } from "~/components/ui/flex_space";
import { Part } from "./part";

export const HistorySection = component$(() => {
    return (
        <div
            id="history"
            class={styles.root}
        >
            <div class={styles.title}>
                <FlexSpace />
                <Raw class={styles.icon} innerHTML={Footprints} />
                <Text class={styles.name}>History</Text>
                <FlexSpace />
            </div>
            <div class={styles.main}>
                <Part time="2020" title="爆誕" >Scratchにて生を受ける。UNDERTALEの二次創作ゲームを作っていた。</Part>
                <Part time="2021" title="初JavaScript" >Discordのbotを作るためにdiscord.jsを触った。文法を全く知らない時代だったが雰囲気でなんとか乗り切った。</Part>
                <Part time="2022" title="Rustとの出会い" >Rustと出会う。最速という文字に惹かれて習得を決意。</Part>
                <Part time="2025" title="現在" />
            </div>
        </div>
    );
});
