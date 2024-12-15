import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "~": "/src",
        },
    },
    plugins: [
        {
            name: "syzygy-redirect",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const reg = /(\.|@|vite)/;
                    if (!reg.test(req.url!)) {
                        req.url = "/syzygy/index.html";
                    }
                    next();
                });
            },
        },
    ],
});
