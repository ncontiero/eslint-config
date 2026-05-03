import type { FlatConfigItem, OptionsE18e } from "../types";
import { interopDefault } from "../utils";

export async function e18e(
  options: OptionsE18e = {},
): Promise<FlatConfigItem[]> {
  const {
    modernization = true,
    moduleReplacements = false,
    overrides = {},
    performanceImprovements = true,
  } = options;

  const pluginE18e = await interopDefault(import("@e18e/eslint-plugin"));
  const { configs } = pluginE18e;

  return [
    {
      name: "ncontiero/e18e/rules",
      plugins: {
        e18e: pluginE18e,
      },
      rules: {
        ...(modernization ? { ...configs.modernization.rules } : {}),
        ...(moduleReplacements ? { ...configs.moduleReplacements.rules } : {}),
        ...(performanceImprovements
          ? { ...configs.performanceImprovements.rules }
          : {}),

        // these are a bit opinionated and dangerous (introducing behavioral changes), so we'll disable them by default for now
        "e18e/prefer-array-at": "off",
        "e18e/prefer-array-from-map": "off",
        "e18e/prefer-array-to-reversed": "off",
        "e18e/prefer-array-to-sorted": "off",
        "e18e/prefer-array-to-spliced": "off",
        "e18e/prefer-spread-syntax": "off",

        ...overrides,
      },
    },
  ];
}
