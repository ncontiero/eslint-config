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

export async function typescriptCore(options: TsOptions = {}) {
  const {
    files = [GLOB_TS, GLOB_TSX],
    overrides = {},
    parserOptions = {},
  } = options;

  const tseslint = await interopDefault(import("typescript-eslint"));

  return tseslint.config({
    extends: [...tseslint.configs.recommended],
    files,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ...parserOptions,
      },
    },
    rules: {
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
  }) as unknown as Promise<FlatConfigItem[]>;
}

export async function typescript(
  options: TsOptions = {},
): Promise<FlatConfigItem[]> {
  const tsCore = typescriptCore(options);

  return [
    ...(await tsCore),

    {
      files: ["**/*.d.ts"],
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: ["**/*.{test,spec}.ts?(x)"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      files: [GLOB_JS, "**/*.cjs"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "no-restricted-syntax": ["error", ...restrictedSyntaxJs],
      },
    },
  ];
}
