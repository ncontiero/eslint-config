import type { FlatConfigItem } from "../types";
import { interopDefault } from "../utils";

export async function promise(): Promise<FlatConfigItem[]> {
  const pluginPromise = await interopDefault(import("eslint-plugin-promise"));

  return [
    {
      ...pluginPromise.configs["flat/recommended"],
      name: "dkshs/promise/setup",
    },
    {
      name: "dkshs/promise/rules",
      rules: {
        "promise/always-return": ["error", { ignoreLastCallback: true }],
        "promise/no-multiple-resolved": "warn",
      },
    },
  ];
}
