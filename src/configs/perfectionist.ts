import type { FlatConfigItem } from "../types";
import { pluginPerfectionist } from "../plugins";

/**
 * Optional perfectionist plugin for props and items sorting.
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
