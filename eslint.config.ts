import { dkshs } from "./src";

export default dkshs(
  {
    react: true,
    nextjs: true,
    tailwindcss: true,
  },
  {
    ignores: ["fixtures", "_fixtures"],
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
      "perfectionist/sort-named-imports": "off",
    },
  },
);
