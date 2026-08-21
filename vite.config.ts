import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: isLib
      ? {
          // npm package build: bundles src/index.ts as a library
          outDir: "dist",
          lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "EaseUI",
            fileName: (format) => `easeui.${format}.js`,
          },
          cssCodeSplit: true,
          rollupOptions: {
            external: ["react", "react-dom"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
        }
      : {
          // demo/docs site build: normal app build using index.html, deployed to Vercel
          outDir: "dist-demo",
        },
  };
});
