import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
    plugins: [reactRouter(), tsconfigPaths()],
    build: {
      outDir: "build/"
    },
    optimizeDeps: {
        esbuildOptions: {
            define: { global: 'globalThis' },
            plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
        }
    }
})
