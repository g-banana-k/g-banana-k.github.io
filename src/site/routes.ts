import type { Page } from "~/syzygy/core/page";
// import Syzygy from "~/syzygy";

import top_page from "~/site/top";
import blog from "~/site/blog/routes";
import type { Routes } from "~/syzygy/generate";

const routes: Routes = new Map<string, Page>();

routes.set("index", top_page);

routes.set("blog", blog);

export default routes;