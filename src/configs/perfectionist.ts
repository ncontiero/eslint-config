import type { FlatConfigItem } from "../types";
import { pluginPerfectionist } from "../plugins";

/**
 * Perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export function perfectionist(): FlatConfigItem[] {
  return [
    {
      name: "ncontiero/perfectionist/rules",
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        "perfectionist/sort-exports": ["warn", { type: "natural" }],
        "perfectionist/sort-imports": [
          "warn",
          {
            customGroups: [
              {
                elementNamePattern: ["^react$", "^react-(?!.*.css$).+"],
                groupName: "react",
              },
            ],
            groups: [
              "side-effect-style",
              "style",
              "type-import",
              "type-external",
              "type-internal",
              ["type-parent", "type-sibling", "type-index"],
              "builtin",
              "react",
              "external",
              "internal",
              ["parent", "sibling", "index"],
              "unknown",
            ],
            internalPattern: ["^[~@#]/.*"],
            newlinesBetween: "ignore",
            type: "natural",
          },
        ],
        "perfectionist/sort-named-exports": [
          "warn",
          { groups: ["type-export", "value-export"] },
        ],
        "perfectionist/sort-named-imports": [
          "warn",
          { groups: ["type-import", "value-import"] },
        ],
      },
    },
  ];
}
