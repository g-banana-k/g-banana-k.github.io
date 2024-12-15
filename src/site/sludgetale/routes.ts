import { sludgetale } from "../system/cms";
import { article_page_st } from "./article";
import type { RMap } from "../system/r_map";
import type { ArticleData } from "../system/markdown";
import type { Routes } from "~/syzygy/generate";

const route = (rm: RMap<ArticleData>): Routes => {
    const m: Routes = new Map();
    rm.as_map().raw().forEach((r, k) => {
        if (r.is_map()) m.set(k, route(rm));
        else m.set(k, article_page_st(r.get()))
    })
    return m;
}

const routes = route(sludgetale);

export default routes;
