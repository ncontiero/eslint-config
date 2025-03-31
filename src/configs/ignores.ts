import type { FlatConfigItem } from "../types";
import { GLOB_EXCLUDE } from "../globs";

export function ignores(userIgnores: string[] = []): FlatConfigItem[] {
  return [
    {
      ignores: [...GLOB_EXCLUDE, ...userIgnores],
      name: "ncontiero/global-ignores",
    },
  ];
}
