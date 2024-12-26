import type { Component } from "@builder.io/qwik";
import styles from "./index.module.css";

export const Heading: Component<{
	level?: 2 | 3 | 4;
	class?: string;
}> = (props) => {
	const level = props.level ?? 2;
	switch (level) {
		// case 1: {
		//     return (
		//         <h1 class={[styles.h1, props.class ?? ""]}>{props.children}</h1>
		//     );
		// }
		case 2: {
			return <h2 class={[styles.h2, props.class ?? ""]}>{props.children}</h2>;
		}
		case 3: {
			return <h3 class={[styles.h3, props.class ?? ""]}>{props.children}</h3>;
		}
		case 4: {
			return <h4 class={[styles.h4, props.class ?? ""]}>{props.children}</h4>;
		}
		// case 5: {
		//     return (
		//         <h5 class={[styles.h5, props.class ?? ""]}>{props.children}</h5>
		//     );
		// }
		// case 6: {
		//     return (
		//         <h6 class={[styles.h6, props.class ?? ""]}>{props.children}</h6>
		//     );
		// }
	}
};
