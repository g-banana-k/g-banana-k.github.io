import { component$, type JSXOutput, Slot } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Raw } from "~/components/ui/raw";
import { CodeXml } from "lucide-static";
import { Text } from "~/components/ui/text";
import { FlexSpace } from "~/components/ui/flex_space";
import { GridView } from "~/components/common/grid_view";

export const SkillsSection = component$(() => {
	return (
		<div
			id="skills"
			class={styles.root}
		>
			<div class={styles.title}>
				<FlexSpace />
				<Raw class={styles.icon} innerHTML={CodeXml} />
				<Text class={styles.name}>Skills</Text>
				<FlexSpace />
			</div>
			<div class={styles.main} >
				<GridView>
					<SkillThumbnail logo="/assets/rust.svg" name="Rust" >
						Atcoderで緑になるまでほぼRust一本で行った。Unsafe Rustが使えない。'static以外のライフタイムも使えない。
					</SkillThumbnail>
					<SkillThumbnail logo="/assets/typescript.svg" name="TypeScript" >
						最近はこればっかり書いてる。型パズルができない。
					</SkillThumbnail>
					<SkillThumbnail logo="/assets/react.svg" name="React" >
						useStateとuseEffect以外の使い方を知らない。useStateに変なラッパーを被せてしまう。strictModeだと動かない。
					</SkillThumbnail>
					<SkillThumbnail logo="/assets/solid.svg" name="Solid" >
						Reactよりは出来る。ReactのStateと違ってすぐ値が更新されるので好き。
					</SkillThumbnail>
				</GridView>
			</div>
		</div>
	);
});

const SkillThumbnail = component$<{ logo: string, name: string }>((props) => {
	return <div class={styles.thumbnail}>
		<div class={styles.thumbnail_title}>
			<div class={styles.thumbnail_icon}>
				<img src={props.logo} alt={props.name} />
			</div>
			<div class={styles.thumbnail_name}>
				{props.name}
			</div>
		</div>
		<div class={styles.thumbnail_main}>
			<Slot />
		</div>
	</div>
})