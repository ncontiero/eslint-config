import type { FlatConfigItem, OptionsTailwindCSS } from "../types";
import path from "node:path";
import { GLOB_HTML, GLOB_REACT } from "../globs";
import { interopDefault } from "../utils";

export async function tailwindcss(
  options: OptionsTailwindCSS = {},
): Promise<FlatConfigItem[]> {
  const { overrides = {} } = options;

  const resolvePath = (p: string) => {
    if (path.isAbsolute(p)) return p;
    return path.resolve(process.cwd(), p);
  };

  const cssGlobalPath = resolvePath(
    options.cssGlobalPath ?? path.join("src", "app", "globals.css"),
  );
  const configPath = resolvePath(
    options.configPath ?? path.join("tailwind.config.ts"),
  );

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
        tailwindcss: {
          entryPoint: cssGlobalPath,
          tailwindConfig: configPath,
        },
      },
    },
    {
      files: [GLOB_REACT, GLOB_HTML],
      name: "ncontiero/tailwindcss/rules",
      rules: {
        "tailwindcss/enforce-consistent-class-order": "warn",
        "tailwindcss/enforce-consistent-important-position": "warn",
        "tailwindcss/enforce-consistent-line-wrapping": [
          "warn",
          { group: "never", preferSingleLine: true, printWidth: 120 },
        ],
        "tailwindcss/enforce-consistent-variable-syntax": "error",
        "tailwindcss/enforce-shorthand-classes": "warn",
        "tailwindcss/no-conflicting-classes": "error",
        "tailwindcss/no-deprecated-classes": "error",
        "tailwindcss/no-duplicate-classes": "error",
        "tailwindcss/no-restricted-classes": "error",
        "tailwindcss/no-unknown-classes": "warn",
        "tailwindcss/no-unnecessary-whitespace": "warn",

        ...overrides,
      },
    },
  ];
}
