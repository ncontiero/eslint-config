import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  Rules,
} from "../types";
import { GLOB_YAML } from "../globs";
import { interopDefault } from "../utils";

export async function yml(
  options: OptionsOverrides & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_YAML], overrides = {} } = options;

  const [pluginYml, parserYml] = await Promise.all([
    interopDefault(import("eslint-plugin-yml")),
    interopDefault(import("yaml-eslint-parser")),
  ] as const);

  return [
    {
      plugins: {
        yml: pluginYml,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserYml,
      },
      rules: {
        ...(pluginYml.configs.standard.rules as Rules),
        ...(pluginYml.configs.prettier.rules as Rules),
        "yml/block-mapping": "error",
        "yml/block-mapping-question-indicator-newline": "error",
        "yml/block-sequence": "error",
        "yml/block-sequence-hyphen-indicator-newline": "error",
        "yml/flow-mapping-curly-newline": "error",
        "yml/flow-mapping-curly-spacing": "error",
        "yml/flow-sequence-bracket-newline": "error",
        "yml/flow-sequence-bracket-spacing": "error",

        "yml/indent": ["error", 2],
        "yml/key-spacing": "error",
        "yml/no-empty-key": "error",
        "yml/no-empty-mapping-value": "off",
        "yml/no-empty-sequence-entry": "error",
        "yml/no-irregular-whitespace": "error",
        "yml/no-tab-indent": "error",
        "yml/plain-scalar": "error",
        "yml/quotes": ["error", { avoidEscape: false, prefer: "double" }],
        "yml/spaced-comment": "error",
        "yml/vue-custom-block/no-parsing-error": "error",

        ...overrides,
      },
    },
  ];
}
