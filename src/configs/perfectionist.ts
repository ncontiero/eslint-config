import type { FlatESLintConfigItem } from "eslint-define-config";

import { pluginPerfectionist } from "../plugins";

export const sortKeys: FlatESLintConfigItem[] = [
  {
    plugins: {
      perfectionist: pluginPerfectionist,
    },
  },
];
