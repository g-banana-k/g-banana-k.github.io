import styles from "./index.module.css";
import { Text } from "../ui/text";
import { component$, Slot } from "@builder.io/qwik";

export const Footer = component$(() => {
	return (
		<div class={styles.root}>
			<Content title="Info">
				<Link href="/info/about">About</Link>
			</Content>
			<Content title="Works">
				<Link href="/blog">Blog</Link>
				<Link href="/banahexel_site">BanaHexel</Link>
			</Content>
			<Content title="Sludgetale">
				<Link href="/sludgetale/hexagon_kimchi_happy_union_verse_abandoned_school_verse_time_trio">
					HKHUVASVTT
				</Link>
			</Content>
			<Content title="Accounts">
				<Link href="https://scratch.mit.edu/users/g_banana_k">Scratch</Link>
				<Link href="https://discord.com/users/834563592069447731">Discord</Link>
				<Link href="https://github.com/g-banana-k">GitHub</Link>
				<Link href="https://bsky.app/profile/g-banana-k.bsky.social">
					Bluesky
				</Link>
			</Content>
		</div>
	);
});

const Content = component$<{
	title: string;
}>((props) => {
	return (
		<div class={styles.content}>
			<Text class={styles.title}>{props.title}</Text>
			<div class={styles.content_main}>
				<Slot />
			</div>
		</div>
	);
});

const Link = component$<{ href?: string }>((props) => {
	return (
		<a href={props.href} class={styles.link}>
			<Text>
				<Slot />
			</Text>
		</a>
	);
});
