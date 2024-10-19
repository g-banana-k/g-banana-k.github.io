import db from "/db.js"

const url_string = window.location.href;
const url = new URL(url_string);

const tag = url.searchParams.get("tag");
const result = db.map.filter(([r_path, data]) => data.tag.includes(tag));