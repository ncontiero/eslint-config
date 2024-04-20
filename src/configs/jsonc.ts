import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  Rules,
} from "../types";
import { interopDefault } from "../utils";
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../globs";

export async function jsonc(
  options: OptionsFiles & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC], overrides = {} } =
    options;

  const [pluginJsonc, parserJsonc] = await Promise.all([
    interopDefault(import("eslint-plugin-jsonc")),
    interopDefault(import("jsonc-eslint-parser")),
  ] as const);

  return [
    {
      plugins: {
        jsonc: pluginJsonc,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        ...(pluginJsonc.configs["recommended-with-jsonc"].rules as Rules),
        "jsonc/quote-props": "off",
        "jsonc/quotes": "off",

        ...overrides,
      },
    },
  ];
}
