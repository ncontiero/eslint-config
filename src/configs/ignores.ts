import type { FlatConfigItem } from "../types";
import { GLOB_EXCLUDE, GLOB_TS, GLOB_TSX } from "../globs";

export function ignores(
  userIgnores: string[] = [],
  ignoreTypeScript = false,
): FlatConfigItem[] {
  const ignores = [...GLOB_EXCLUDE, ...userIgnores];

  if (ignoreTypeScript) {
    ignores.push(GLOB_TS, GLOB_TSX);
  }

  return [
    {
      ignores,
      name: "ncontiero/ignores",
    },
  ];
}
