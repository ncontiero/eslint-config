import type { Awaitable, FlatConfigItem } from "./types";

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
