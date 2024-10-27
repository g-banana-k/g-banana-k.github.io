export type MetaDataRaw = {
    category?: "sludgetale" | "note",
    title?: string,
    subtitle?: string,
    page_title?: string,
    description?: string,
    thumbnail?: string,
    tag?: string[],
}

export class MetaData implements MetaDataRaw {
    category: "sludgetale" | "note"
    url: string
    title: string
    subtitle: string
    page_title: string
    description: string
    thumbnail: string
    tag: string[]
    constructor(md: MetaDataRaw, r_path: string) {
        this.category = md.category ?? "note";
        this.url = `https://g-banana-k.github.io/${r_path.replace(/\/index$/, "")}`;
        this.title = md.title ?? "Untitled";
        this.subtitle = md.subtitle ?? "untitled";
        this.page_title = ({
            sludgetale: `${(this.title && this.title !== "SLUDGETALE") ? `${this.title} | ` : ""}SLUDGETALE`,
            note: `${this.title ? `${this.title} | ` : ""}BananaLinoleum's house`
        } as Record<"sludgetale" | "note", string>)[this.category];
        this.tag = md.tag ?? [];
        this.description=md.description ?? "なんかの記事です";
        this.thumbnail=md.thumbnail ?? (this.category ==="note" ? "/assets/blinol.png" : "/assets/blinol.png")
    }
}