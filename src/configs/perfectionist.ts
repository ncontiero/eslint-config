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
            customGroups: {
              type: {
                react: ["^react$", "^react-(?!.*.css$).+"],
              },
              value: {
                react: ["^react$", "^react-(?!.*.css$).+"],
              },
            },
            groups: [
              "side-effect-style",
              "style",
              "type",
              "internal-type",
              ["parent-type", "sibling-type", "index-type"],
              "builtin",
              "react",
              "external",
              "internal",
              ["parent", "sibling", "index"],
              "object",
              "unknown",
            ],
            internalPattern: ["^[~@#]/.*"],
            newlinesBetween: "ignore",
            type: "natural",
          },
        ],
        "perfectionist/sort-named-exports": [
          "warn",
          { groupKind: "types-first" },
        ],
        "perfectionist/sort-named-imports": [
          "warn",
          { groupKind: "types-first" },
        ],
      },
    },
  ];
}
