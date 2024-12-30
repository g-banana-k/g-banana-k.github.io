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

				</GridView>
			</div>
		</div>
	);
});

const SkillThumbnail = component$<{ logo: string, name: string }>((props) => {
	return <div class={styles.thumbnail}><img src={props.logo} alt={props.name} /></div>
})