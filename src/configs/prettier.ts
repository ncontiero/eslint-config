import type { FlatConfigItem, PrettierOptions } from "../types";
import {
  GLOB_CSS,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_SRC,
} from "../globs";
import { interopDefault, parserPlain } from "../utils";

export async function prettier(
  options: PrettierOptions = {},
): Promise<FlatConfigItem[]> {
  const pluginPrettier = await interopDefault(import("eslint-plugin-prettier"));

  return [
    {
      name: "ncontiero/prettier/setup",
      plugins: {
        prettier: pluginPrettier,
      },
    },
    {
      files: [GLOB_SRC],
      name: "ncontiero/prettier/disables",
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
      name: "ncontiero/prettier/rules",
      rules: {
        "prettier/prettier": ["warn", options],
      },
    },
    {
      files: [GLOB_MARKDOWN],
      languageOptions: {
        parser: parserPlain,
      },
      name: "ncontiero/prettier/markdown",
      rules: {
        "prettier/prettier": ["warn", { ...options, parser: "markdown" }],
      },
    },
    {
      files: [GLOB_CSS, GLOB_POSTCSS],
      languageOptions: {
        parser: parserPlain,
      },
      name: "ncontiero/prettier/css",
      rules: {
        "prettier/prettier": ["warn", { ...options, parser: "css" }],
      },
    },
    {
      files: [GLOB_SCSS],
      name: "ncontiero/prettier/scss",
      rules: {
        "prettier/prettier": ["warn", { ...options, parser: "scss" }],
      },
    },
    {
      files: [GLOB_LESS],
      name: "ncontiero/prettier/less",
      rules: {
        "prettier/prettier": ["warn", { ...options, parser: "less" }],
      },
    },
  ];
}
