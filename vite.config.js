import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/wedding-invite/",
    build: {
        outDir: "dist",
        sourcemap: false,
        assetsInlineLimit: 0,
    },
});
