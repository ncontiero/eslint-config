import type { FlatConfigItem, PrettierOptions } from "../types";
import { GLOB_SRC } from "../globs";
import { interopDefault } from "../utils";

export async function prettier(
  options: PrettierOptions = {},
): Promise<FlatConfigItem[]> {
  const pluginPrettier = await interopDefault(import("eslint-plugin-prettier"));

  return [
    {
      name: "dkshs/prettier/setup",
      plugins: {
        prettier: pluginPrettier,
      },
    },
    {
      files: [GLOB_SRC],
      name: "dkshs/prettier/disables",
      rules: {
        "antfu/consistent-list-newline": "off",
        "arrow-body-style": "off",
        curly: "off",
        "no-unexpected-multiline": "off",
        "prefer-arrow-callback": "off",
        "unicorn/empty-brace-spaces": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/number-literal-case": "off",
        "unicorn/template-indent": "off",
      },
    },
    {
      files: [GLOB_SRC],
      name: "dkshs/prettier",
      rules: {
        "prettier/prettier": ["warn", options],
      },
    },
  ];
}
