import { component$ } from "@builder.io/qwik";

export const Raw = component$<{
    innerHTML: string
}>((props) => {
    return <div dangerouslySetInnerHTML={props.innerHTML} />;
});
