import type { Awaitable, FlatConfigItem } from "./types";
import { isPackageExists } from "local-pkg";

const isCwdInScope = isPackageExists("@ncontiero/eslint-config");

export const parserPlain = {
  meta: {
    name: "parser-plain",
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: "Program",
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
};

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<FlatConfigItem | FlatConfigItem[]>[]
): Promise<FlatConfigItem[]> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

export async function interopDefault<T>(
  m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}

export function ensurePackages(packages: (string | undefined)[]) {
  if (process.env.CI || !process.stdout.isTTY || !isCwdInScope) return;

  const nonExistingPackages = packages.filter((i) => i && !isPackageExists(i));
  if (nonExistingPackages.length === 0) return;

  throw new Error(
    `This package(s) are required for this config: ${nonExistingPackages.join(", ")}. Please install them.`,
  );
}

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @example
 * ```ts
 * import { renameRules } from "@ncontiero/eslint-config";
 *
 * export default [
 *   {
 *     rules: renameRules(
 *       {
 *         "@typescript-eslint/indent": "error",
 *       },
 *       { "@typescript-eslint": "ts" },
 *     ),
 *   },
 * ];
 * ```
 */
export function renameRules(
  rules: Record<string, any>,
  map: Record<string, string>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`))
          return [to + key.slice(from.length), value];
      }
      return [key, value];
    }),
  );
}

/**
 * Rename plugin names a flat configs array
 *
 * @example
 * ```ts
 * import { renamePluginInConfigs } from "@ncontiero/eslint-config";
 * import someConfigs from "./some-configs";
 *
 * export default renamePluginInConfigs(someConfigs, {
 *   "@typescript-eslint": "ts",
 * });
 * ```
 */
export function renamePluginInConfigs(
  configs: FlatConfigItem[],
  map: Record<string, string>,
): FlatConfigItem[] {
  return configs.map((i) => {
    const clone = { ...i };
    if (clone.rules) clone.rules = renameRules(clone.rules, map);
    if (clone.plugins) {
      clone.plugins = Object.fromEntries(
        Object.entries(clone.plugins).map(([key, value]) => {
          if (key in map) return [map[key], value];
          return [key, value];
        }),
      );
    }
    return clone;
  });
}

export interface ComposerOptions {
  configs: Awaitable<FlatConfigItem[]>[];
  pluginsNameMap?: Record<string, string>;
}

export async function composer({ configs, pluginsNameMap }: ComposerOptions) {
  const resolvedItems = await Promise.all(configs);
  let finalConfigs = resolvedItems.flat();
  if (pluginsNameMap) {
    finalConfigs = renamePluginInConfigs(finalConfigs, pluginsNameMap);
  }
  return finalConfigs;
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
