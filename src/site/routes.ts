import type { Page } from "~/syzygy/core/page";
import top_page from "~/site/top";
// import blog from "~/site/blog/routes";
// import info from "~/site/info/routes";
// import sludgetale from "~/site/sludgetale/routes";
import type { Routes } from "~/syzygy/generate";

const routes: Routes = new Map<string, Page>();

routes.set("index", top_page);

// routes.set("blog", blog);
// 
// routes.set("info", info);
// 
// routes.set("sludgetale", sludgetale);

export default routes;
