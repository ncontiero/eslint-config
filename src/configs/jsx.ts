import type { FlatConfigItem, OptionsJSX } from "../types";
import { GLOB_JSX, GLOB_TSX } from "../globs";
import { interopDefault } from "../utils";

export async function jsx(options: OptionsJSX = {}): Promise<FlatConfigItem[]> {
  const { a11y = false } = options;

  // Base JSX configuration without a11y
  const baseConfig: FlatConfigItem = {
    files: [GLOB_JSX, GLOB_TSX],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    name: "ncontiero/jsx/setup",
    plugins: {},
    rules: {},
  };

  // Return early if no a11y configuration is needed
  if (!a11y) {
    return [baseConfig];
  }

  const jsxA11yPlugin = await interopDefault(import("eslint-plugin-jsx-a11y"));
  const a11yConfig = jsxA11yPlugin.flatConfigs.recommended;

  const overrides =
    typeof a11y === "object" && a11y.overrides ? a11y.overrides : {};

  // Merge base config with a11y configuration
  return [
    {
      ...baseConfig,
      ...a11yConfig,
      files: baseConfig.files,
      languageOptions: {
        ...baseConfig.languageOptions,
        ...a11yConfig.languageOptions,
      },
      name: baseConfig.name,
      plugins: {
        ...baseConfig.plugins,
        "jsx-a11y": jsxA11yPlugin,
      },
      rules: {
        ...baseConfig.rules,
        ...(a11yConfig.rules || {}),

        "jsx-a11y/anchor-is-valid": [
          "warn",
          {
            aspects: ["noHref", "invalidHref", "preferButton"],
            components: ["Link"],
            specialLink: ["to", "hrefLeft", "hrefRight"],
          },
        ],
        "jsx-a11y/control-has-associated-label": [
          "warn",
          {
            controlComponents: [],
            depth: 5,
            ignoreElements: [
              "audio",
              "canvas",
              "embed",
              "input",
              "textarea",
              "tr",
              "video",
            ],
            ignoreRoles: [
              "grid",
              "listbox",
              "menu",
              "menubar",
              "radiogroup",
              "row",
              "tablist",
              "toolbar",
              "tree",
              "treegrid",
            ],
            labelAttributes: ["label"],
          },
        ],
        "jsx-a11y/lang": "warn",

        ...overrides,
      },
    },
  ];
}
