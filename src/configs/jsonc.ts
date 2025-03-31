import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  Rules,
  StyleOptions,
} from "../types";
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../globs";
import { interopDefault } from "../utils";

export async function jsonc(
  options: OptionsFiles & OptionsOverrides & StyleOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    overrides = {},
    style = true,
  } = options;

  const { indent = 2 } = typeof style === "boolean" ? {} : style;

  const [pluginJsonc, parserJsonc] = await Promise.all([
    interopDefault(import("eslint-plugin-jsonc")),
    interopDefault(import("jsonc-eslint-parser")),
  ] as const);

  return [
    {
      name: "ncontiero/jsonc/setup",
      plugins: {
        jsonc: pluginJsonc,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserJsonc,
      },
      name: "ncontiero/jsonc/rules",
      rules: {
        ...(pluginJsonc.configs["recommended-with-jsonc"].rules as Rules),
        "jsonc/array-bracket-spacing": ["error", "never"],
        "jsonc/comma-style": ["error", "last"],
        "jsonc/indent": ["error", indent],
        "jsonc/key-spacing": [
          "error",
          { afterColon: true, beforeColon: false },
        ],
        "jsonc/object-curly-newline": [
          "error",
          { consistent: true, multiline: true },
        ],
        "jsonc/object-curly-spacing": ["error", "always"],
        "jsonc/object-property-newline": [
          "error",
          { allowMultiplePropertiesPerLine: true },
        ],
        "jsonc/quote-props": "off",
        "jsonc/quotes": "off",

        ...overrides,
      },
    },
  ];
}
