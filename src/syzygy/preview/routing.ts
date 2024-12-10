import { render } from ".";
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

const locate = (routes: Routes, src: string) => {
    if (src.startsWith("http://") || src.startsWith("https://")) location.href = src;
    const page = get_page(routes, src)
    if (!page) return;

    const body = document.body;
    body.innerHTML = "";
    const rendering = render(page.body);
    rendering(body);
    history.pushState(null, "", src);
}

export const Router = {
    locate
}