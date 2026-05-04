import type { FlatConfigItem, OptionsFiles, OptionsOverrides } from "../types";
import { GLOB_SRC } from "../globs";
import { ensurePackages, interopDefault } from "../utils";

export async function tanstackQuery(
  options: OptionsFiles & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_SRC], overrides = {} } = options;

  ensurePackages(["@tanstack/eslint-plugin-query"]);

  const tanstackQueryPlugin = await interopDefault(
    import("@tanstack/eslint-plugin-query"),
  );
  const config = tanstackQueryPlugin.configs.recommended;

  return [
    {
      name: "ncontiero/tanstack-query/setup",
      plugins: {
        "@tanstack/query": tanstackQueryPlugin,
      },
    },
    {
      files,
      name: "ncontiero/tanstack-query/rules",
      rules: {
        ...config.rules,
        ...overrides,
      },
    },
  ];
}
