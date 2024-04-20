import type { FlatConfigItem, OptionsFiles, OptionsOverrides } from "../types";
import { GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN } from "../globs";
import { interopDefault } from "../utils";

export async function markdown(
  options: OptionsFiles & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_MARKDOWN], overrides = {} } = options;

  const pluginMarkdown = await interopDefault(import("eslint-plugin-markdown"));

  return [
    ...pluginMarkdown.configs.recommended,

    {
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      rules: {
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-redeclare": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",

        "no-alert": "off",
        "no-console": "off",
        "no-restricted-imports": "off",
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",

        "node/prefer-global/buffer": "off",
        "node/prefer-global/process": "off",

        "unused-imports/no-unused-imports": "off",
        "unused-imports/no-unused-vars": "off",

        ...overrides,
      },
    },
  ];
}
