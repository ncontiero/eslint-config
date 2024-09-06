import type { FlatConfigItem, OptionsHasNextJs } from "../types";
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from "../globs";
import { pluginAntfu, pluginImport } from "../plugins";

export function imports(options: OptionsHasNextJs = {}): FlatConfigItem[] {
  const { nextJs = false } = options;

  return [
    {
      name: "dkshs/imports/rules",
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport,
      },
      rules: {
        "antfu/import-dedupe": "error",
        "import/first": "error",
        "import/newline-after-import": ["error", { count: 1 }],
        "import/no-default-export": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",
      },
    },
    {
      files: [
        `**/*config*.${GLOB_SRC_EXT}`,
        `**/{views,pages,routes,middleware,plugins,api,app}/${GLOB_SRC}`,
        nextJs ? "{,src/}middleware.{ts,js}" : "",
        `**/{index,vite,esbuild,rollup,rolldown,webpack,rspack}.ts`,
        "**/*.d.ts",
        `${GLOB_MARKDOWN}/**`,
        "**/.prettierrc*",
      ],
      name: "dkshs/imports/allow-default-export",
      rules: {
        "import/no-default-export": "off",
      },
    },
  ];
}
