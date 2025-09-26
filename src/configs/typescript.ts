import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
} from "../types";
import { GLOB_JS, GLOB_TS, GLOB_TSX } from "../globs";
import { interopDefault } from "../utils";
import { restrictedSyntaxJs } from "./javascript";

type TsOptions = OptionsFiles &
  OptionsOverrides &
  OptionsTypeScriptParserOptions;

export async function typescript(
  options: TsOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_TS, GLOB_TSX],
    overrides = {},
    parserOptions = {},
  } = options;

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import("@typescript-eslint/eslint-plugin")),
    interopDefault(import("@typescript-eslint/parser")),
  ] as const);

  return [
    {
      name: "ncontiero/typescript/setup",
      plugins: {
        "@typescript-eslint": pluginTs,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: "module",
          ...parserOptions,
        },
      },
      name: "ncontiero/typescript/parser",
    },
    {
      files,
      name: "ncontiero/typescript/rules",
      rules: {
        ...pluginTs.configs["eslint-recommended"].overrides![0].rules,
        ...pluginTs.configs.recommended.rules,

        "@typescript-eslint/ban-ts-comment": [
          "error",
          { "ts-ignore": "allow-with-description" },
        ],
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow-as-parameter",
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "@typescript-eslint/no-empty-object-type": [
          "error",
          { allowInterfaces: "always" },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTaggedTemplates: false,
            allowTernary: true,
            enforceForJSX: true,
          },
        ],

        // handled by unused-imports/no-unused-imports
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-wrapper-object-types": "error",
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/prefer-literal-enum-member": [
          "error",
          { allowBitwiseExpressions: true },
        ],

        "no-restricted-syntax": [
          "error",
          ...restrictedSyntaxJs,
          "TSEnumDeclaration[const=true]",
        ],

        ...overrides,
      },
    },
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
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ];
}
