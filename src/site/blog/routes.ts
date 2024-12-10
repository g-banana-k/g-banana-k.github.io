import type { Page } from "~/syzygy/core/page";

import top_page from "./index";

const routes = new Map<string, Page>();

routes.set("index", top_page)

export default routes;