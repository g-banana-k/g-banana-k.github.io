import type { Component } from "@builder.io/qwik";

class Post {
    title: string;
    tags: string[];
    name: string;
    published: string;
    updated: string;
    content: Component<unknown>;
    constructor(content: Component<unknown>, title: string, tags: string[], name: string, published: string, updated?: string) {
        this.title = title;
        this.tags = tags;
        this.name = name;
        this.published = published;
        this.updated = updated ?? published;
        this.content = content;
    }
}

export const get_list = async (category: "blog"): Promise<Post[]> => {
    return [][0]
}

export const get_content = async (category: "blog", name: string): Promise<Post | undefined> => {
    return [][0]
}