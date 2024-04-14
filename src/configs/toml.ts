import type { FlatESLintConfigItem } from "eslint-define-config";

import { GLOB_TOML } from "../globs";
import { parserToml, pluginToml } from "../plugins";

export const toml: FlatESLintConfigItem[] = [
  {
    plugins: {
      toml: pluginToml,
    },
  },
  {
    files: [GLOB_TOML],
    languageOptions: {
      parser: parserToml,
    },
    rules: {
      "toml/comma-style": "error",
      "toml/keys-order": "error",
      "toml/no-space-dots": "error",
      "toml/no-unreadable-number-separator": "error",
      "toml/precision-of-fractional-seconds": "error",
      "toml/precision-of-integer": "error",
      "toml/tables-order": "error",
      "toml/vue-custom-block/no-parsing-error": "error",

      "unicorn/filename-case": "off",
    },
  },
];
