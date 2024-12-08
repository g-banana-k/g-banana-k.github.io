import esbuild from "esbuild";

esbuild
    .build({
        entryPoints: ["~/index.ts"],
        bundle: true,
        alias: { "~": "./src" },
        outfile: "./dist/bundle.js",
        jsx: "automatic",
        jsxImportSource: "~/syzygy/jsx",
        platform: "node",
        sourcemap: "inline"
    })
    .catch(() => process.exit(1));
