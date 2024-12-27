import { component$, type HTMLAttributes } from "@builder.io/qwik";

export const Raw = component$(
	<K extends keyof HTMLElementMap>(
		props: {
			tag?: K;
			innerHTML: string;
		} & HTMLAttributes<HTMLElementMap[K]>,
	) => {
		const p: HTMLAttributes<HTMLElementMap[K]> = {};
		for (const [k, v] of Object.entries(props)) {
			if (k === "innerHTML" || k === "tag") continue;
			p[k as keyof HTMLAttributes<HTMLElementMap[K]>] = v;
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const Tag: any = props.tag ?? "div";
		// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
		return <Tag {...p} dangerouslySetInnerHTML={props.innerHTML} />;
	},
);

type HTMLElementMap = {
	div: HTMLDivElement;
	code: HTMLElement;
};
