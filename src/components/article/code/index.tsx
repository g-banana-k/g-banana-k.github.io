import { component$ } from "@builder.io/qwik";
import hljs from "highlight.js";
import { Raw } from "~/components/ui/raw";
import styles from "./index.module.css";

export const CodeBlock = component$<{ code: string, lang?: string, styles: CSSModuleClasses }>((props) => {
    const highlighted = props.lang
        ? hljs.highlight(props.code, { language: props.lang })
        : hljs.highlightAuto(props.code);
    return (
        <pre class={`$hljs ${styles.pre} ${props.styles.pre ?? ""}`}>
            <Raw tag="code" class={props.styles.code} innerHTML={highlighted.value} />
        </pre>
    );
})

export const InlineCode = component$<{ code: string,styles: CSSModuleClasses }>((props) => {
    return (
        <code class={`${styles.inline_code} ${props.styles.inline_code ?? ""}`} >
            {props.code}
        </code>
    );
})