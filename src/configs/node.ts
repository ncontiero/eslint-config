import type { FlatConfigItem } from "../types";
import { pluginNode } from "../plugins";

export function node(): FlatConfigItem[] {
  return [
    {
      name: "dkshs/node",
      plugins: {
        node: pluginNode,
      },
      rules: {
        "node/handle-callback-err": ["error", "^(err|error)$"],
        "node/no-deprecated-api": "error",
        "node/no-exports-assign": "error",
        "node/no-new-require": "error",
        "node/no-path-concat": "error",
        "node/no-unsupported-features/es-builtins": "error",
        "node/no-unsupported-features/es-syntax": "error",
        "node/no-unsupported-features/node-builtins": "error",
        "node/prefer-global/console": ["error", "always"],
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/url": ["error", "always"],
        "node/prefer-global/url-search-params": ["error", "always"],
        "node/process-exit-as-throw": "error",
      },
    },
  ];
}
