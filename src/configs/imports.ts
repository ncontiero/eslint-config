import type { FlatConfigItem, OptionsHasNextJs } from "../types";
import { pluginAntfu, pluginImport } from "../plugins";
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from "../globs";

export function imports(options: OptionsHasNextJs = {}): FlatConfigItem[] {
  const { nextJs = false } = options;

  return [
    {
      name: "dkshs/imports",
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
        "import/order": [
          "error",
          {
            groups: [
              "type",
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
            ],
            pathGroups: [
              {
                group: "type",
                pattern: "*.css",
                patternOptions: {
                  matchBase: true,
                },
                position: "before",
              },
              { group: "internal", pattern: "{{@,~}/,#}**" },
            ],
            pathGroupsExcludedImportTypes: ["type"],
            warnOnUnassignedImports: true,
          },
        ],
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
      name: "dkshs/allow-default-export",
      rules: {
        "import/no-default-export": "off",
      },
    },
  ];
}
