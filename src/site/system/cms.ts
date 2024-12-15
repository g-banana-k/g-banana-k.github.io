import { crawl } from "~/site/system/fs";
import { RMap } from "./r_map";
import { ArticleData } from "./markdown";

const blog = RMap.new<ArticleData>();

const d = new ArticleData(`---
title: "Example Document"
date: "2024-12-14"
tags: ["sample1", "sample2"]
---

# Heading 1

This is a paragraph with **bold text**.

- List item 1
- List item 2
`, "20241214");

blog.set("20241214", d)

const tags = new Map<string, string>([
    ["sample1", "hsl(0, 100%, 90%)"  ],
    ["sample2", "hsl(120, 100%, 90%)"],
    ["sample3", "hsl(240, 100%, 90%)"],
])

export {
    blog,
    tags
}