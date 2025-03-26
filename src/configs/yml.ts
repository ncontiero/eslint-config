import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  StyleOptions,
} from "../types";
import { GLOB_YAML } from "../globs";
import { interopDefault } from "../utils";

export async function yml(
  options: OptionsOverrides & OptionsFiles & StyleOptions = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_YAML], overrides = {}, style = true } = options;

  const { indent = 2, quotes = "double" } =
    typeof style === "boolean" ? {} : style;

  const [pluginYml, parserYml] = await Promise.all([
    interopDefault(import("eslint-plugin-yml")),
    interopDefault(import("yaml-eslint-parser")),
  ] as const);

  return [
    {
      name: "dkshs/yml/setup",
      plugins: {
        yml: pluginYml,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserYml,
      },
      name: "dkshs/yml/rules",
      rules: {
        "yml/block-mapping": "error",
        "yml/block-mapping-question-indicator-newline": "error",
        "yml/block-sequence": "error",
        "yml/block-sequence-hyphen-indicator-newline": "error",
        "yml/flow-mapping-curly-newline": "error",
        "yml/flow-mapping-curly-spacing": "error",
        "yml/flow-sequence-bracket-newline": "error",
        "yml/flow-sequence-bracket-spacing": "error",
        "yml/indent": ["error", indent],
        "yml/key-spacing": "error",
        "yml/no-empty-document": "error",
        "yml/no-empty-key": "error",
        "yml/no-empty-sequence-entry": "error",
        "yml/no-irregular-whitespace": "error",
        "yml/no-tab-indent": "error",
        "yml/plain-scalar": "error",
        "yml/quotes": ["error", { avoidEscape: false, prefer: quotes }],
        "yml/spaced-comment": "error",
        "yml/vue-custom-block/no-parsing-error": "error",

        ...overrides,
      },
    },
    {
      files: ["pnpm-workspace.yaml"],
      name: "dkshs/yml/pnpm-workspace",
      rules: {
        "yml/sort-keys": [
          "error",
          {
            order: [
              "packages",
              "overrides",
              "patchedDependencies",
              "hoistPattern",
              "catalog",
              "catalogs",

              "allowedDeprecatedVersions",
              "allowNonAppliedPatches",
              "allowUnusedPatches",
              "configDependencies",
              "ignoredBuiltDependencies",
              "ignoredOptionalDependencies",
              "ignorePatchFailures",
              "neverBuiltDependencies",
              "onlyBuiltDependencies",
              "onlyBuiltDependenciesFile",
              "packageExtensions",
              "peerDependencyRules",
              "supportedArchitectures",
            ],
            pathPattern: "^$",
          },
          {
            order: { type: "asc" },
            pathPattern: ".*",
          },
        ],
      },
    },
  ];
}
