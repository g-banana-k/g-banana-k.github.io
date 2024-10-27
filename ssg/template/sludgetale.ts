import { MetaData } from "../metadata/main.js";
import { is_ascii } from "../util.js";
import { floating } from "./floating.js";
import { footer } from "./footer.js";

export const sludgetale_template = (content: string, meta: MetaData) => {
    const title_determination = is_ascii(meta.title) ? "determination" : "";
    return `
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.page_title}</title>
    <link rel="icon" href="/assets/blinol.png" />
    <link rel="canonical" href="${meta.url}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css" />
    <link rel="stylesheet" href="/styles/note.css">
    <link rel="stylesheet" href="/styles/ut_theme.css">
    <link rel="stylesheet" href="/styles/footer.css">

    <meta property="og:title" content="${meta.page_title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:url" content="${meta.url}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${meta.thumbnail}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${meta.page_title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${meta.thumbnail}">

</head>

<body>
    <main>
        <div id="head">
            <h1 class="${title_determination}">${meta.title}</h1>
            <h2>${meta.subtitle}</h2>
        </div>
        <article>
        ${content}
        </article>
    </main>
    ${footer()}
    ${floating()}
</body>

</html>
    `
}