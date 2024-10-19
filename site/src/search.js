import db from "/db.js"

/**
 * @typedef {Object} DB
 * @prop {[string, DBContent][]} map
 */

/**
 * @typedef {Object} DBContent
 * @prop {string} category
 * @prop {string[]} tag
 * @prop {string} title
 * @prop {string} subtitle
 */

const url_string = window.location.href;
const url = new URL(url_string);

/** @type {HTMLInputElement} */
const input = document.querySelector("#search_text_box");

/** @type {HTMLDivElement} */
const button = document.querySelector("#search_button");

/** @type {HTMLDivElement} */
const result_area = document.querySelector("#search_result_area");

const tags = url.searchParams.get("tag") ?? "";
const words = url.searchParams.get("word") ?? "";
const category = url.searchParams.get("category") ?? "";

const url_without_params = url.origin + url.pathname;

input.value = [...(category ? [`category:${category}`] : []), ...tags.split(" ").filter(s => s).map(tag => `tag:${tag}`), ...words.split(" ")].join(" ")

/**
 * @param {DB} db
 * @param {string[]} tags 
 * @param {string[]} words
 * @param {string} category 
 */
const search = (db, tags, words, category) => {
    return db.map.filter(([path, content]) => {
        return tags.every(tag => content.tag.includes(tag))
            && words.every(word => content.title.includes(word) || content.subtitle.includes(word))
            && (!category || category == content.category)
    })
}


/**
 * @param {DBContent[]} contents
 */

const update = () => {
    /** @type {string[]} */
    const tags = [];
    /** @type {string[]} */
    const words = [];
    let category = "";

    input.value.split(" ").forEach(word => {
        if (word.startsWith("tag:")) {
            tags.push(word.substring(4))
        } else if (word.startsWith("category:")) {
            category = word.substring(9)
        } else {
            words.push(word)
        }
    });

    const contents = search(db, tags, words, category)

    result_area.innerHTML = contents.map(([r_path, c]) => `
        <a href="/${r_path.endsWith('/index') ? r_path.slice(0, -6) : r_path}"><div class="search_result">
        <div class="search_result_inner">
            <h2>${c.title}</h2>
            <h3>${c.subtitle}</h3>
            </div></a>
            <div class="tag_area">${c.tag.map(tag => `<div class="tag" onClick="trans_with_tag('${tag}')">${tag}</div>`).join("")}</div>
        </div>
    `).join("")
}
/**
 * @param {string} tag 
 */

const trans_with_tag = (tag) => {
    input.value = `tag:${tag}`;
    update()
}

window.trans_with_tag = trans_with_tag;

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        button.dispatchEvent(new PointerEvent("click"))
        e.preventDefault()
    }
});

button.addEventListener("click", () => {
    /** @type {string[]} */
    const tags = [];
    /** @type {string[]} */
    const words = [];
    let category = "";

    input.value.split(" ").forEach(word => {
        if (word.startsWith("tag:")) {
            tags.push(word.substring(4))
        } else if (word.startsWith("category:")) {
            category = word.substring(9)
        } else {
            words.push(word)
        }
    });
    url.searchParams.set("tag", tags.join(" "));
    url.searchParams.set("word", words.join(" "));
    url.searchParams.set("category", category);
    history.replaceState(null, '', url.toString());
    update()
});

update()