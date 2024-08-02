import type { FlatConfigItem } from "../types";
import { pluginPerfectionist } from "../plugins";

/**
 * Generates a configuration object for the Perfectionist plugin with specific sorting rules.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export function perfectionist(): FlatConfigItem[] {
  return [
    {
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        "perfectionist/sort-named-exports": [
          "warn",
          { groupKind: "types-first" },
        ],
        "perfectionist/sort-named-imports": [
          "warn",
          { groupKind: "types-first" },
        ],
      },
    },
  ];
}
