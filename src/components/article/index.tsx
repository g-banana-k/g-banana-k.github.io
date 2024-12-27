import styles from "./index.module.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/common/header";
import { Title } from "~/components/article/title";
import { component$, Slot } from "@builder.io/qwik";
import { tags } from "~/system/tags";
import { Raw } from "../ui/raw";

export const Article = component$<{
	path?: { name: string; link?: string }[];
	title: string;
	date: string;
	tags: string[];
	styles: CSSModuleClasses;
	innerHTML?: string;
}>((props) => {
	return (
		<div id={styles.root}>
			<div id={styles.main}>
				<Header path={props.path} />
				<div class={styles.article}>
					<Title
						tags={props.tags.map((tag) => ({
							name: tag,
							color: tags.get(tag) ?? "hsl(0, 0%, 90%)",
						}))}
						yyyy-mm-dd={props.date}
					>
						{props.title}
					</Title>
					{props.innerHTML ? (
						<Raw
							class={`${styles.body} ${
								props.styles.root ?? ""
							}`}
							innerHTML={props.innerHTML}
						/>
					) : (
						<div class={`${styles.body} ${props.styles.root ?? ""}`}>
							<Slot />
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
});
