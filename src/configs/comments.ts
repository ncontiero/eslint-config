import type { FlatConfigItem } from "../types";
import { pluginComments } from "../plugins";

export function comments(): FlatConfigItem[] {
  return [
    {
      name: "dkshs/comments",
      plugins: {
        "eslint-comments": pluginComments,
      },
      rules: {
        ...pluginComments.configs.recommended.rules,
        "eslint-comments/disable-enable-pair": [
          "error",
          { allowWholeFile: true },
        ],
      },
    },
  ];
}
