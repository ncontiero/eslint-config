import type { FlatConfigItem, HTMLOptions } from "../types";
import { GLOB_HTML } from "../globs";
import { interopDefault } from "../utils";

export async function html(options: HTMLOptions): Promise<FlatConfigItem[]> {
  const { overrides = {} } = options;

  const [eslintParserHTML, eslintPluginHTML] = await Promise.all([
    interopDefault(import("@html-eslint/parser")),
    interopDefault(import("@html-eslint/eslint-plugin")),
  ] as const);

  const templateEngineSyntax = options.templateEngineSyntax ?? {
    "{{": "}}",
    "{%": "%}",
  };

  return [
    {
      files: [GLOB_HTML],
      languageOptions: {
        parser: eslintParserHTML,
        parserOptions: {
          templateEngineSyntax,
        },
      },
      name: "ncontiero/html/setup",
      plugins: {
        html: eslintPluginHTML,
      },
    },
    {
      files: [GLOB_HTML],
      name: "ncontiero/html/rules",
      rules: {
        "html/attrs-newline": ["warn", { ifAttrsMoreThan: 5 }],
        "html/element-newline": ["warn", { inline: [`$inline`] }],
        "html/indent": ["warn", 2],
        "html/lowercase": "warn",
        "html/no-aria-hidden-body": "error",
        "html/no-aria-hidden-on-focusable": "warn",
        "html/no-duplicate-attrs": "error",
        "html/no-duplicate-class": "warn",
        "html/no-duplicate-id": "error",
        "html/no-duplicate-in-head": "error",
        "html/no-empty-headings": "warn",
        "html/no-extra-spacing-attrs": [
          "warn",
          {
            disallowInAssignment: true,
            disallowMissing: true,
            enforceBeforeSelfClose: true,
          },
        ],
        "html/no-extra-spacing-text": "warn",
        "html/no-heading-inside-button": "warn",
        "html/no-ineffective-attrs": "warn",
        "html/no-invalid-entity": "warn",
        "html/no-invalid-role": "warn",
        "html/no-multiple-empty-lines": ["warn", { max: 1 }],
        "html/no-multiple-h1": "error",
        "html/no-nested-interactive": "error",
        "html/no-non-scalable-viewport": "warn",
        "html/no-obsolete-tags": "error",
        "html/no-script-style-type": "warn",
        "html/no-target-blank": "error",
        "html/no-trailing-spaces": "warn",
        "html/quotes": "warn",
        "html/require-button-type": "warn",
        "html/require-closing-tags": ["warn", { selfClosing: "always" }],
        "html/require-doctype": "error",
        "html/require-form-method": "warn",
        "html/require-img-alt": "warn",
        "html/require-lang": "warn",
        "html/require-li-container": "warn",
        "html/require-meta-charset": "warn",
        "html/require-meta-viewport": "warn",
        "html/require-title": "warn",
        "html/sort-attrs": [
          "warn",
          {
            priority: [
              "name",
              "content",
              "id",
              "type",
              { pattern: "data-.*" },
              "class",
              "style",
            ],
          },
        ],
        "html/use-baseline": "error",

        ...overrides,
      },
    },
  ];
}
