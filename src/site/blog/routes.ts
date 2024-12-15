import type { Page } from "~/syzygy/core/page";

import top_page from "./index";
import { blog } from "../system/cms";
import { article_page } from "./article";

const routes = new Map<string, Page>();

routes.set("index", top_page);

blog.forEach((d, k) => {
    routes.set(k, article_page(d));
});

export default routes;
