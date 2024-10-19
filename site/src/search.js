import db from "/db.js"

const url_string = window.location.href;
const url = new URL(url_string);

const input = document.querySelector("#search_text_box");
const button = document.querySelector("#search_button");

const tags = url.searchParams.get("tag") ?? "";
const words = url.searchParams.get("word") ?? "";

input.value = [...tags.split(" ").filter(s => s).map(tag => `tag:${tag}`), ...words.split(" ")].join(" ")

button.addEventListener("click", () => {
    const tags = [];
    const words = [];
    input.value.split(" ").forEach(word => {
        if (word.startsWith("tag:")) {
            tags.push(word.substring(4))
        } else {
            words.push(word)
        }
    });
    url.searchParams.set("tag", tags.join(" "));
    url.searchParams.set("word", words.join(" "));
    history.replaceState(null, '', url.toString());
});

