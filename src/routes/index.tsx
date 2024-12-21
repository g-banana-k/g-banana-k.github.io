import styles from "./index.module.css";

import { ScratchLike } from "~/components/top/scratch_like";
import { Footer } from "~/components/footer";
import { component$ } from "@builder.io/qwik";

export default component$(() => {
	return (
		<div id={styles.root}>
			<ScratchLike />
			<Footer />
		</div>
	);
});
