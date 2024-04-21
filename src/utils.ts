import type { Awaitable, FlatConfigItem } from "./types";

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

export async function composer(...items: Awaitable<FlatConfigItem[]>[]) {
  let configs: FlatConfigItem[] = [];
  const resolvedItems = await Promise.all(items);
  const flatResolved = resolvedItems.flat();
  configs = [...configs, ...flatResolved];
  return configs;
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
