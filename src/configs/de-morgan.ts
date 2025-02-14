import type { FlatConfigItem } from "../types";
import { pluginDeMorgan } from "../plugins";

export function deMorgan(): FlatConfigItem[] {
  return [
    {
      ...pluginDeMorgan.configs.recommended,
      name: "dkshs/de-morgan",
    },
  ];
}
