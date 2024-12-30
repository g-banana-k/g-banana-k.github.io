import styles from "./index.module.css";

import { ScratchLike } from "~/components/top/scratch_like";
import { Footer } from "~/components/footer";
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
	return (
		<div id={styles.root}>
			<ScratchLike />
			<Footer />
		</div>
	);
});

export const head: DocumentHead = () => {
	return {
		title: "gBanaKnal's House",
		meta: [
			{
				name: "description",
				content: "Site of gBanaKnal",
			},
		],
		links: [
			{
				rel:"icon",
				href:"/blinol.png"
			}
		]
	};
};
