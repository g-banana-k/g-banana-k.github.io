import styles from "./index.module.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/common/header";
import { Title } from "~/components/article/title";
import { component$, Slot } from "@builder.io/qwik";
import { Raw } from "../ui/raw";

export const Article = component$<{
	path?: { name: string; link?: string }[];
	title: string;
	date: string;
	tags: { name: string; color: string }[];
	styles: CSSModuleClasses;
	innerHTML?: string;
}>((props) => {
	return (
		<div id={styles.root} class={props.styles.root ?? styles.root}>
			<div id={styles.main}>
				<Header path={props.path} />
				<div class={`${styles.article} ${props.styles.article ?? styles.article2}`}>
					<Title
						styles={props.styles}
						tags={props.tags.map(({ name, color }) => ({
							name,
							color,
						}))}
						yyyy-mm-dd={props.date}
					>
						{props.title}
					</Title>
					{props.innerHTML ? (
						<Raw
							class={`${styles.body} ${props.styles.body ?? ""}`}
							innerHTML={props.innerHTML}
						/>
					) : (
						<div class={`${styles.body} ${props.styles.body ?? ""}`}>
							<Slot />
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
});
