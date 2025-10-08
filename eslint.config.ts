import { ncontiero } from "./src";

export default ncontiero(
  {
    react: true,
    nextjs: true,
    tailwindcss: true,
    reactQuery: true,
    javascript: {
      overrides: {
        "node/no-unsupported-features/node-builtins": [
          "error",
          { allowExperimental: true },
        ],
      },
    },
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
      "sort-imports": "off",
      "perfectionist/sort-named-imports": "off",
    },
  },
);
