import { MetaData } from "../metadata/main"

export const card = (meta: MetaData) => {
    return `
<meta property="og:title" content="${meta.page_title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${meta.url}">
<meta property="og:type" content="website">
<meta property="og:image" content="${meta.thumbnail}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${meta.page_title}">
<meta name="twitter:description" content="${meta.description}">
<meta name="twitter:image" content="${meta.thumbnail}">
`
}

export const highlight_css = (langs: Set<string>) => {
    if (langs.size!==0) {
        return `<link rel="stylesheet" href="/styles/lib/highlight.css">`
    } else {
        return ""
    }
}