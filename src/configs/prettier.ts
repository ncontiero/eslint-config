import type { FlatConfigItem, PrettierOptions } from "../types";
import { interopDefault } from "../utils";

export async function prettier(
  options: PrettierOptions = {},
): Promise<FlatConfigItem[]> {
  const [pluginPrettier, configPrettier] = await Promise.all([
    interopDefault(import("eslint-plugin-prettier")),
    interopDefault(import("eslint-config-prettier")),
  ]);

  const prettierConflictRules = { ...configPrettier.rules };
  delete prettierConflictRules["vue/html-self-closing"];

  return [
    {
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        ...prettierConflictRules,
        ...pluginPrettier.configs.recommended.rules,
        "prettier/prettier": ["warn", options],
      },
    },
  ];
}
