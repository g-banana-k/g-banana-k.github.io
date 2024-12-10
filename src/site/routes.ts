import type { Page } from "~/syzygy/core/page";
// import Syzygy from "~/syzygy";

import top_page from "~/site/top";

const routes = new Map<string, Page>();

routes.set("index", top_page);

export default routes;