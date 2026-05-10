import type { FlatConfigItem, OptionsOverrides } from "../types";
import { interopDefault } from "../utils";

export async function promise(
  options: OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { overrides = {} } = options;

  const pluginPromise = await interopDefault(import("eslint-plugin-promise"));

  return [
    {
      ...pluginPromise.configs["flat/recommended"],
      name: "ncontiero/promise/setup",
    },
    {
      name: "ncontiero/promise/rules",
      rules: {
        "promise/always-return": ["error", { ignoreLastCallback: true }],
        "promise/no-multiple-resolved": "warn",

        ...overrides,
      },
    },
  ];
}
