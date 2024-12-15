import type { Page } from "~/syzygy/core/page";
import { info } from "../system/cms";
import { article_page } from "../blog/article";

const routes = new Map<string, Page>();

info.forEach((d, k) => {
    routes.set(k, article_page(d));
});

export default routes;
