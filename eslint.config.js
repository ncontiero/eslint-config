import { createRequire } from "node:module";
// import { dkshs } from './dist/index.js'

const require = createRequire(import.meta.url);
require("sucrase/register");
/** @type {typeof import('./src/index.ts')} */
const { dkshs } = require("./src/index.ts");

export default dkshs([
  {
    files: ["src/**/*.ts"],
    rules: {
      "perfectionist/sort-objects": "error",
    },
  },
  {
    files: ["**/*.md/*"],
    rules: {
      "sort-imports": "off",
    },
  },
]);
