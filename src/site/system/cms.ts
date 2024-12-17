import { crawl, rel_path } from "~/site/system/fs";
import { RMap } from "./r_map";
import { ArticleData } from "./markdown";

// const blog = RMap.new<ArticleData>();
// 
// const info = RMap.new<ArticleData>();
// 
// const sludgetale = RMap.new<ArticleData>();
// 
// blog.set("sample", new ArticleData(`---
// title: "gBanaKnal読み問題"
// date: "2024-12-15"
// tags: ["gBanaKnal", "Blog"]
// ---
// 
// # 見出し1
// ## 見出し2
// ### 見出し3
// テキスト
// 
// `,"sample"))

const contents = (await crawl(rel_path("src/contents"), "", ["blog", "info", "sludgetale"]))
    .as_map()
    .map(({ code }, key) => new ArticleData(code, key))
    .as_map();

const tags = new Map<string, string>([
    ["gBanaKnal", "hsl(48, 100%, 90%)"],
    ["Info", "hsl(0, 0%, 90%)"],
]);

const blog = contents.get("blog")!.as_map();
const info = contents.get("info")!.as_map();
const sludgetale = contents.get("sludgetale")!.as_map();

export { tags, blog, info, sludgetale };
