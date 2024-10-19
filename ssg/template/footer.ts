import { MetaData } from "../metadata/main.js";

export const footer = (content: string, metadata: MetaData, r_path: string) => {
    return `
<footer>
    <div id="footer_grid">
        <div class="footer_content">
            <h4><a href="/info">Info</a></h4>
            <ul>
                <li><a href="/info/about">About</a></li>
                <li><a href="/info/profile">Profile</a></li>
                <li><a href="/info/readme">Readme</a></li>
                <li><a href="/info/credit">Credit</a></li>
            </ul>
        </div>
        <div class="footer_content">
            <h4>Works</h4>
            <ul>
                <li><a href="https://g-banana-k.github.io/banahexel_site">BanaHexel</a></li>
            </ul>
        </div>
        <div class="footer_content">
            <h4><a href="/sludgetale">SludgeTale</a></h4>
            <ul>
                <li><a href="/sludgetale/hexagon_kimchi_happy_union_verse_abandoned_school_verse_time_trio">HKHUVASVTT</a></li>
            </ul>
        </div>
        <div class="footer_content">
            <h4>Links</h4>
            <ul>
                <li><a href="https://discord.com/users/834563592069447731">Discord</a></li>
                <li><a href="https://github.com/g-banana-k">GitHub</a></li>
                <li><a href="https://bsky.app/profile/g-banana-k.bsky.social">Bluesky</a></li>
                <li><a href="https://twitter.com/g_banana_k">Twitter</a></li>
            </ul>
        </div>
    </div>
    <a href="/" class="logo footer_logo">
        <img src="/assets/blinol.png" class="icon blinol">
        <h3>BananaLinoleum</h3>
    </a>
</footer>`
}