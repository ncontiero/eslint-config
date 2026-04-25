import type { FlatConfigItem, OptionsFiles, OptionsOverrides } from "../types";
import { mergeProcessors, processorPassThrough } from "eslint-merge-processors";
import {
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_CODE,
  GLOB_MARKDOWN_IN_MARKDOWN,
} from "../globs";
import { interopDefault, parserPlain } from "../utils";

export async function markdown(
  options: OptionsFiles & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_MARKDOWN], overrides = {} } = options;

  const pluginMarkdown = await interopDefault(import("@eslint/markdown"));

  return [
    {
      name: "ncontiero/markdown/setup",
      plugins: {
        markdown: pluginMarkdown,
      },
    },
    {
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      name: "ncontiero/markdown/processor",
      // `eslint-plugin-markdown` only creates virtual files for code blocks,
      // but not the markdown file itself. We use `eslint-merge-processors` to
      // add a pass-through processor for the markdown file itself.
      processor: mergeProcessors([
        pluginMarkdown.processors.markdown,
        processorPassThrough,
      ]),
    },
    {
      files,
      languageOptions: {
        parser: parserPlain,
      },
      name: "ncontiero/markdown/parser",
    },
    {
      files: [GLOB_MARKDOWN_CODE],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      name: "ncontiero/markdown/rules",
      rules: {
        "import/newline-after-import": "off",
        "no-alert": "off",
        "no-console": "off",
        "no-restricted-imports": "off",
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "node/prefer-global/buffer": "off",
        "node/prefer-global/process": "off",

        "ts/comma-dangle": "off",
        "ts/consistent-type-imports": "off",
        "ts/no-extraneous-class": "off",
        "ts/no-namespace": "off",
        "ts/no-redeclare": "off",
        "ts/no-require-imports": "off",
        "ts/no-unused-expressions": "off",
        "ts/no-unused-vars": "off",
        "ts/no-use-before-define": "off",

        "unused-imports/no-unused-imports": "off",
        "unused-imports/no-unused-vars": "off",

        ...overrides,
      },
    },
  ];
}
