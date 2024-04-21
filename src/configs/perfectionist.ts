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
    },
  ];
}
