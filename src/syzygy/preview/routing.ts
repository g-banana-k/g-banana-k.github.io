import type { Node } from "../core/element";
import type { Page } from "../core/page";
import { isRoutes, type Routes } from "../generate";

const get_page = (routes: Routes, src: string): Page | undefined => {
    const p = src.split("#")[0].split("/");
    p.shift();
    let i = 0;
    let r: Routes | Page | undefined = routes;
    while (i !== p.length - 1) {
        if (isRoutes(r!)) r = r.get(p[i]);
        else return undefined
        i += 1;
    }
    if (isRoutes(r!)) {
        const current = r.get(p[i]);
        if (isRoutes(current)) {
            const p = current.get("index");
            return !isRoutes(p) ? p : undefined
        }
        if (p[i] === "") {
            const p = r.get("index");
            return !isRoutes(p) ? p : undefined;
        }
        return current;
    }
    return undefined;
}

declare global {
    interface WindowEventMap {
        "syzygy_rendering": CustomEvent<{ node: Node }>;
    }
}

const locate = (routes: Routes, src: string, push?: false) => {
    console.log(src);
    if (src.startsWith("http://") || src.startsWith("https://") || src.includes("#")) { location.href = src; return; }
    const page = get_page(routes, src)

    const body = document.body;
    body.innerHTML = "";
    if (push ?? true) history.pushState(null, "", src);
    if (!page) return;
    window.dispatchEvent(new CustomEvent("syzygy_rendering", {
        detail: {
            node: page.body
        }
    }))
}

const init = (routes: Routes) => {
    locate(routes, location.pathname);
    window.addEventListener("popstate", () => {
        locate(routes, location.pathname, false)
    })
}

export const Router = {
    locate,
    init,
};