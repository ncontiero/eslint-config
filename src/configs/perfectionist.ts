import type { FlatConfigItem } from "../types";
import { pluginPerfectionist } from "../plugins";

export function sortKeys(): FlatConfigItem[] {
  return [
    {
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
  ];
}
