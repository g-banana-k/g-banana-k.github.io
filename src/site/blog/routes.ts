import type { Page } from "~/syzygy/core/page";

import top_page from "./index";
import sample_page from "./sample";

const routes = new Map<string, Page>();

routes.set("index", top_page)

routes.set("sample", sample_page)

export default routes;