import type { FlatConfigItem, OptionsTailwindCSS } from "../types";
import path from "node:path";
import { getPackageInfo } from "local-pkg";
import { GLOB_HTML, GLOB_SRC } from "../globs";
import { interopDefault } from "../utils";

export async function tailwindcss(
  options: OptionsTailwindCSS = {},
): Promise<FlatConfigItem[]> {
  const { cwd, detectComponentClasses, overrides = {}, tsconfigPath } = options;

  const cssGlobalPath =
    options.cssGlobalPath ?? path.join("src", "app", "globals.css");
  const configPath = options.configPath ?? path.join("tailwind.config.ts");

  const tailwindV4Rules: FlatConfigItem["rules"] = {
    "tailwindcss/enforce-canonical-classes": "error",
    "tailwindcss/enforce-consistent-important-position": "off",
    "tailwindcss/enforce-consistent-variable-syntax": "off",
    "tailwindcss/enforce-shorthand-classes": "off",
  };

  const tailwindPackageInfo = await getPackageInfo("tailwindcss");
  const isV4 = tailwindPackageInfo?.version?.startsWith("4");

  const pluginTailwindCss = await interopDefault(
    import("eslint-plugin-better-tailwindcss"),
  );

  return [
    {
      name: "ncontiero/tailwindcss/setup",
      plugins: {
        tailwindcss: pluginTailwindCss,
      },
      settings: {
        "better-tailwindcss": {
          cwd,
          detectComponentClasses,
          entryPoint: cssGlobalPath,
          tailwindConfig: configPath,
          tsconfig: tsconfigPath,
        },
      },
    },
    {
      files: [GLOB_SRC, GLOB_HTML],
      name: "ncontiero/tailwindcss/rules",
      rules: {
        "tailwindcss/enforce-consistent-class-order": "warn",
        "tailwindcss/enforce-consistent-important-position": "warn",
        "tailwindcss/enforce-consistent-line-wrapping": [
          "warn",
          { group: "never", preferSingleLine: true, printWidth: 125 },
        ],
        "tailwindcss/enforce-consistent-variable-syntax": "error",
        "tailwindcss/enforce-consistent-variant-order": "warn",
        "tailwindcss/enforce-shorthand-classes": "warn",
        "tailwindcss/no-conflicting-classes": "error",
        "tailwindcss/no-deprecated-classes": "error",
        "tailwindcss/no-duplicate-classes": "error",
        "tailwindcss/no-restricted-classes": "error",
        "tailwindcss/no-unknown-classes": "warn",
        "tailwindcss/no-unnecessary-whitespace": "warn",

        ...(isV4 ? tailwindV4Rules : {}),
        ...overrides,
      },
    },
  ];
}
