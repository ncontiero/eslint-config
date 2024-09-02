import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  StyleOptions,
} from "../types";
import { GLOB_TOML } from "../globs";
import { interopDefault } from "../utils";

export async function toml(
  options: OptionsOverrides & OptionsFiles & StyleOptions = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_TOML], overrides = {}, style = true } = options;

  const { indent = 2 } = typeof style === "boolean" ? {} : style;

  const [pluginToml, parserToml] = await Promise.all([
    interopDefault(import("eslint-plugin-toml")),
    interopDefault(import("toml-eslint-parser")),
  ] as const);

  return [
    {
      name: "dkshs/toml/setup",
      plugins: {
        toml: pluginToml,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserToml,
      },
      name: "dkshs/toml/rules",
      rules: {
        "toml/array-bracket-newline": "error",
        "toml/array-bracket-spacing": "error",
        "toml/array-element-newline": "off",
        "toml/comma-style": "error",
        "toml/indent": ["error", indent],
        "toml/inline-table-curly-spacing": "error",
        "toml/key-spacing": "error",
        "toml/keys-order": "error",
        "toml/no-space-dots": "error",
        "toml/no-unreadable-number-separator": "error",
        "toml/padding-line-between-pairs": "error",
        "toml/padding-line-between-tables": "error",
        "toml/precision-of-fractional-seconds": "error",
        "toml/precision-of-integer": "error",
        "toml/quoted-keys": "error",
        "toml/spaced-comment": "error",
        "toml/table-bracket-spacing": "error",
        "toml/tables-order": "error",
        "toml/vue-custom-block/no-parsing-error": "error",

        "unicorn/filename-case": "off",

        ...overrides,
      },
    },
  ];
}
