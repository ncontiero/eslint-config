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
        ts: pluginTs,
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

        "no-restricted-syntax": [
          "error",
          ...restrictedSyntaxJs,
          "TSEnumDeclaration[const=true]",
        ],

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
        "ts/consistent-type-imports": [
          "error",
          { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
        ],
        "ts/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "ts/no-empty-object-type": ["error", { allowInterfaces: "always" }],
        "ts/no-explicit-any": "off",
        "ts/no-import-type-side-effects": "error",
        "ts/no-non-null-assertion": "off",
        "ts/no-redeclare": "error",
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
        "ts/no-useless-constructor": "error",
        "ts/no-wrapper-object-types": "error",
        "ts/prefer-as-const": "warn",
        "ts/prefer-literal-enum-member": [
          "error",
          { allowBitwiseExpressions: true },
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
        "ts/no-require-imports": "off",
      },
    },
  ];
}
