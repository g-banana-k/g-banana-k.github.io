import { crawl, rel_path } from "~/site/system/fs";
import { RMap } from "./r_map";
import { ArticleData } from "./markdown";

const blog = (await crawl(rel_path("src/contents/blog")))
    .as_map()
    .map(({ code }, key) => new ArticleData(code, key))
    .as_map();

const tags = new Map<string, string>([
    ["sample1", "hsl(0, 100%, 90%)"],
    ["sample2", "hsl(120, 100%, 90%)"],
    ["sample3", "hsl(240, 100%, 90%)"],
]);

export { blog, tags };
