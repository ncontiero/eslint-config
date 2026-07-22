import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsHasTypeScript,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from "../types";

import { GLOB_MARKDOWN, GLOB_TESTS, GLOB_TS_TESTS } from "../globs";
import { interopDefault } from "../utils";

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any;

export async function test(
  options: OptionsFiles &
    OptionsOverrides &
    OptionsHasTypeScript &
    OptionsTypeScriptParserOptions &
    OptionsTypeScriptWithTypes = {},
): Promise<FlatConfigItem[]> {
  const {
    files = GLOB_TESTS,
    filesTypeAware = GLOB_TS_TESTS,
    ignoresTypeAware = [`${GLOB_MARKDOWN}/**`],
    overrides = {},
    tsconfigPath,
    typescript = false,
  } = options;

  const isTypeAware = typescript && (!!tsconfigPath || !!options.typeAware);

  const typeAwareRules: FlatConfigItem["rules"] = {
    "test/unbound-method": "error",
    "ts/unbound-method": "off",
  };

  const [pluginVitest, pluginNoOnlyTests] = await Promise.all([
    interopDefault(import("@vitest/eslint-plugin")),
    // @ts-expect-error missing types
    interopDefault(import("eslint-plugin-no-only-tests")),
  ] as const);

  _pluginTest = _pluginTest || {
    ...pluginVitest,
    rules: {
      ...pluginVitest.rules,
      // extend `test/no-only-tests` rule
      ...pluginNoOnlyTests.rules,
    },
  };

  return [
    {
      name: "ncontiero/test/setup",
      plugins: {
        test: _pluginTest,
      },
    },
    {
      files,
      name: "ncontiero/test/rules",
      rules: {
        "test/consistent-test-it": [
          "error",
          { fn: "it", withinDescribe: "it" },
        ],
        "test/hoisted-apis-on-top": "warn",
        "test/no-duplicate-hooks": "warn",
        "test/no-identical-title": "error",
        "test/no-import-node-test": "error",
        "test/no-only-tests": "error",
        "test/prefer-hooks-in-order": "error",
        "test/prefer-lowercase-title": ["error", { ignore: ["describe"] }],

        // Disables
        ...{
          "antfu/no-top-level-await": "off",
          "e18e/prefer-static-regex": "off",
          "no-unused-expressions": "off",
          "node/prefer-global/process": "off",
          "ts/explicit-function-return-type": "off",
        },

        ...overrides,
      },
    },
    ...(isTypeAware
      ? [
          {
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            name: "ncontiero/test/type-aware-rules",
            rules: {
              ...typeAwareRules,
            },
            settings: {
              vitest: {
                typecheck: true,
              },
            },
          },
        ]
      : []),
  ];
}
