import { component$, QwikIntrinsicElements, Slot } from "@builder.io/qwik";

export const Text = component$<QwikIntrinsicElements["div"]>((props) => {
	return (
		<div {...props}>
			<Slot />
		</div>
	);
});
