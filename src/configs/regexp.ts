import type { FlatConfigItem, OptionsOverrides } from "../types";
import { configs } from "eslint-plugin-regexp";

export function regexp(options: OptionsOverrides = {}): FlatConfigItem[] {
  const config = configs["flat/recommended"];

  const rules = {
    ...config.rules,
    ...options.overrides,
  };

  return [
    {
      ...config,
      name: "dkshs/regexp/rules",
      rules,
    },
  ];
}
