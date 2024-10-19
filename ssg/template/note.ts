import { MetaData } from "../metadata/main.js";
import { footer } from "./footer.js";

export const note_template = (content: string, meta: MetaData, r_path: string) => {
    const url = `https://g-banana-k.github.io/${r_path.replace(/\/index$/, "")}`
    const page_title = `${meta.title ? `${meta.title} | ` : ""}BananaLinoleum's house`
    const title = meta.title ? meta.title : "Untitled";
    const subtitle = meta.subtitle ? meta.subtitle : "untitled";
    return `
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page_title}</title>
    <link rel="icon" href="/assets/blinol.png" />
    <link rel="canonical" href="${url}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css" />
    <link rel="stylesheet" href="/styles/note.css">
    <link rel="stylesheet" href="/styles/note_theme.css">
    <link rel="stylesheet" href="/styles/footer.css">
</head>

<body>
    <main>
        <div id="head">
            <h1>${title}</h1>
            <h2>${subtitle}</h2>
        </div>
        <article>
        ${content}
        </article>
    </main>
    ${footer()}
</body>

</html>
    `
}