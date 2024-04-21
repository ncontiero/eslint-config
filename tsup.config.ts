import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
});
