import type { FlatConfigItem } from "../types";
import { GLOB_SRC } from "../globs";
import { pluginPromise } from "../plugins";

export function promise(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_SRC],
      name: "dkshs/promise",
      plugins: {
        promise: pluginPromise,
      },
      rules: {
        "promise/always-return": ["error", { ignoreLastCallback: true }],
        "promise/catch-or-return": ["error"],
        // Does not yet support ESLint v9 - "warn"
        "promise/no-callback-in-promise": ["off"],
        // Does not yet support ESLint v9 - "warn"
        "promise/no-nesting": ["off"],
        "promise/no-new-statics": ["error"],
        // Does not yet support ESLint v9 - "warn"
        "promise/no-promise-in-callback": ["off"],
        "promise/no-return-in-finally": ["warn"],
        // Does not yet support ESLint v9 - "error"
        "promise/no-return-wrap": ["off"],
        "promise/param-names": ["error"],
        "promise/valid-params": ["warn"],
      },
    },
  ];
}
