import type { FlatConfigItem, OptionsFiles, OptionsOverrides } from "../types";
import { GLOB_REACT } from "../globs";
import { interopDefault } from "../utils";

export async function nextJs(
  options: OptionsFiles & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_REACT], overrides = {} } = options;

  const pluginNextJs = await interopDefault(import("@next/eslint-plugin-next"));

  return [
    {
      files,
      name: "ncontiero/nextjs/rules",
      plugins: {
        nextjs: pluginNextJs,
      },
      rules: {
        "nextjs/google-font-display": ["warn"],
        "nextjs/google-font-preconnect": ["warn"],
        "nextjs/inline-script-id": ["error"],
        "nextjs/next-script-for-ga": ["warn"],
        "nextjs/no-assign-module-variable": ["error"],
        "nextjs/no-async-client-component": "warn",
        "nextjs/no-before-interactive-script-outside-document": ["warn"],
        "nextjs/no-css-tags": ["warn"],
        "nextjs/no-document-import-in-page": ["error"],
        "nextjs/no-duplicate-head": ["error"],
        "nextjs/no-head-element": ["warn"],
        "nextjs/no-head-import-in-document": ["error"],
        "nextjs/no-html-link-for-pages": ["warn"],
        "nextjs/no-img-element": ["warn"],
        "nextjs/no-page-custom-font": ["warn"],
        "nextjs/no-script-component-in-head": ["error"],
        "nextjs/no-styled-jsx-in-document": ["warn"],
        "nextjs/no-sync-scripts": ["warn"],
        "nextjs/no-title-in-document-head": ["warn"],
        "nextjs/no-typos": ["warn"],
        "nextjs/no-unwanted-polyfillio": ["warn"],
        // Disable react-refresh/only-export-components in next
        "react-refresh/only-export-components": ["off"],

        ...overrides,
      },
    },
  ];
}
