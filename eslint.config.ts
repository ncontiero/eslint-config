import { dkshs } from "./src";

export default dkshs(
  {
    react: true,
    nextjs: true,
    tailwindcss: true,
  },
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
);
