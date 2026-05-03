import { ncontiero } from "../src";

export default ncontiero(
  {
    react: true,
    typescript: true,
    prettier: true,
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
);
