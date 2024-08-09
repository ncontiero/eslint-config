import type { FlatConfigItem } from "../types";
import { interopDefault } from "../utils";

export async function promise(): Promise<FlatConfigItem[]> {
  const pluginPromise = await interopDefault(import("eslint-plugin-promise"));

  return [
    {
      ...pluginPromise.configs["flat/recommended"],
      name: "dkshs/promise/setup",
    },
  ];
}
