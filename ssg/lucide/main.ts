import * as lucide from "lucide-static";

export const lucide_replace = (code: string)=> {
    const pg = /\{\{\s*lucide\s+([^\s]+)\s*\}\}/g;
    const p = /\{\{\s*lucide\s+([^\s]+)\s*\}\}/;
    const s = code.replaceAll(pg, (s) => {
        const name = s.match(p)![1];
        console.log(`'${name}'`)
        const icons = lucide;
        if (name in icons) {
            const node = icons[name as keyof typeof icons];
            console.log(node);
            return node;
        } else {
            return "&lt&lt UNKNOWN LUCIDE ICON &gt&gt"
        }
    })
    return s;
}