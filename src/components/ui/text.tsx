import { component$, QwikIntrinsicElements } from "@builder.io/qwik";

export const Text = component$<QwikIntrinsicElements["div"]>((props) => {
	return <div {...props}>{props.children}</div>;
});
