export type MetaDataRaw = {
    category?: "sludgetale" | "note",
    title?: string,
    subtitle?: string,
    page_title?: string,
    tag?: string[]
}

export class MetaData implements MetaDataRaw {
    category?: "sludgetale" | "note"
    title?: string
    subtitle?: string
    page_title?: string
    tag: string[]
    constructor(md: MetaDataRaw) {
        this.title = md.title;
        this.category = md.category;
        this.subtitle = md.subtitle;
        this.page_title = md.page_title;
        this.tag = md.tag ?? [];
    }
}