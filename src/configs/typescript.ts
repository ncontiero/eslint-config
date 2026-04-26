import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from "../types";
import { GLOB_JS, GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from "../globs";
import { pluginAntfu } from "../plugins";
import { interopDefault, renameRules } from "../utils";
import { restrictedSyntaxJs } from "./javascript";

export async function typescript(
  options: OptionsFiles &
    OptionsOverrides &
    OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    overrides = {},
    overridesTypeAware = {},
    parserOptions = {},
  } = options;

  const files = options.files ?? [GLOB_TS, GLOB_TSX];

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX];
  const ignoresTypeAware = options.ignoresTypeAware ?? [`${GLOB_MARKDOWN}/**`];
  const tsconfigPath = options?.tsconfigPath ? options.tsconfigPath : undefined;
  const isTypeAware = !!tsconfigPath;

  const typeAwareRules: FlatConfigItem["rules"] = {
    "dot-notation": "off",
    "no-implied-eval": "off",
    "ts/await-thenable": "error",
    "ts/dot-notation": ["error", { allowKeywords: true }],
    "ts/no-floating-promises": "error",
    "ts/no-for-in-array": "error",
    "ts/no-implied-eval": "error",
    "ts/no-misused-promises": "error",
    "ts/no-unnecessary-type-assertion": "error",
    "ts/no-unsafe-argument": "error",
    "ts/no-unsafe-assignment": "error",
    "ts/no-unsafe-call": "error",
    "ts/no-unsafe-member-access": "error",
    "ts/no-unsafe-return": "error",
    "ts/promise-function-async": "error",
    "ts/restrict-plus-operands": "error",
    "ts/restrict-template-expressions": "error",
    "ts/return-await": ["error", "in-try-catch"],
    "ts/strict-boolean-expressions": [
      "error",
      { allowNullableBoolean: true, allowNullableObject: true },
    ],
    "ts/switch-exhaustiveness-check": "error",
    "ts/unbound-method": "error",
  };

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import("@typescript-eslint/eslint-plugin")),
    interopDefault(import("@typescript-eslint/parser")),
  ] as const);

  function makeParser(
    typeAware: boolean,
    files: string[],
    ignores?: string[],
  ): FlatConfigItem {
    return {
      files,
      ...(ignores ? { ignores } : {}),
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: "module",
          ...(typeAware
            ? {
                projectService: {
                  allowDefaultProject: ["./*.js"],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...parserOptions,
        },
      },
      name: `ncontiero/typescript/${typeAware ? "type-aware-parser" : "parser"}`,
    };
  }

  return [
    {
      name: "ncontiero/typescript/setup",
      plugins: {
        antfu: pluginAntfu,
        ts: pluginTs,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...(isTypeAware
      ? [
          makeParser(false, files),
          makeParser(true, filesTypeAware, ignoresTypeAware),
        ]
      : [makeParser(false, files)]),
    {
      files,
      name: "ncontiero/typescript/rules",
      rules: {
        ...renameRules(
          pluginTs.configs["eslint-recommended"].overrides![0].rules!,
          { "@typescript-eslint": "ts" },
        ),
        ...renameRules(pluginTs.configs.strict.rules!, {
          "@typescript-eslint": "ts",
        }),

        "no-dupe-class-members": "off",
        "no-redeclare": "off",
        "no-restricted-syntax": [
          "error",
          ...restrictedSyntaxJs,
          "TSEnumDeclaration[const=true]",
        ],
        "no-use-before-define": "off",
        "no-useless-constructor": "off",

        "ts/ban-ts-comment": [
          "error",
          { "ts-ignore": "allow-with-description" },
        ],
        "ts/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow-as-parameter",
          },
        ],
        "ts/consistent-type-definitions": ["error", "interface"],
        "ts/consistent-type-imports": [
          "error",
          { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
        ],
        "ts/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "ts/no-dupe-class-members": "error",
        "ts/no-dynamic-delete": "off",
        "ts/no-empty-object-type": ["error", { allowInterfaces: "always" }],
        "ts/no-explicit-any": "off",
        "ts/no-extraneous-class": "off",
        "ts/no-import-type-side-effects": "error",
        "ts/no-invalid-void-type": "off",
        "ts/no-non-null-assertion": "off",
        "ts/no-redeclare": ["error", { builtinGlobals: false }],
        "ts/no-require-imports": "error",
        "ts/no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTaggedTemplates: false,
            allowTernary: true,
            enforceForJSX: true,
          },
        ],

        // handled by unused-imports/no-unused-imports
        "ts/no-unused-vars": "off",
        "ts/no-useless-constructor": "off",
        "ts/no-wrapper-object-types": "error",
        "ts/prefer-as-const": "warn",
        "ts/prefer-literal-enum-member": [
          "error",
          { allowBitwiseExpressions: true },
        ],
        "ts/triple-slash-reference": "off",
        "ts/unified-signatures": "off",

        ...overrides,
      },
    },
    ...(isTypeAware
      ? [
          {
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            name: "ncontiero/typescript/rules-type-aware",
            rules: {
              ...typeAwareRules,
              ...overridesTypeAware,
            },
          },
        ]
      : []),
    {
      files: ["**/*.d.ts"],
      name: "ncontiero/typescript/dts-rules",
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "no-restricted-syntax": ["error", ...restrictedSyntaxJs],
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: [GLOB_JS, "**/*.cjs"],
      name: "ncontiero/typescript/cjs-rules",
      rules: {
        "ts/no-require-imports": "off",
      },
    },
  ];
}
