import { dkshs } from "./src";

export default dkshs(
  {
    react: true,
    nextjs: true,
    tailwindcss: true,
  },
  {
    ignores: ["fixtures", "_fixtures", ".eslint-config-inspector"],
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
      "perfectionist/sort-named-imports": "off",
    },
  },
);
