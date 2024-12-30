import { component$, type JSXOutput, Slot } from "@builder.io/qwik";
import styles from "./index.module.css";
import { Raw } from "~/components/ui/raw";
import { Briefcase } from "lucide-static";
import { Text } from "~/components/ui/text";
import { FlexSpace } from "~/components/ui/flex_space";
import { GridView } from "~/components/common/grid_view";
import { Thumbnail } from "~/components/common/thumbnail";

export const WorksSection = component$(() => {
	return (
		<div
			id="works"
			class={styles.root}
		>
			<div class={styles.title}>
				<FlexSpace />
				<Raw class={styles.icon} innerHTML={Briefcase} />
				<Text class={styles.name}>Works</Text>
				<FlexSpace />
			</div>
			<div class={styles.main} >
				<GridView>
					<Thumbnail title="gBanaKnal's House" link="/"/>
				</GridView>
			</div>
		</div>
	);
});
