import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsOverrides,
  Rules,
} from "../types";
import { GLOB_YAML } from "../globs";
import { interopDefault } from "../utils";

export async function yml(
  options: OptionsOverrides & OptionsFiles = {},
): Promise<FlatConfigItem[]> {
  const { files = [GLOB_YAML], overrides = {} } = options;

  const [pluginYml, parserYml] = await Promise.all([
    interopDefault(import("eslint-plugin-yml")),
    interopDefault(import("yaml-eslint-parser")),
  ] as const);

  return [
    {
      files,
      languageOptions: {
        parser: parserYml,
      },
      plugins: {
        yml: pluginYml,
      },
      rules: {
        ...(pluginYml.configs.standard.rules as Rules),
        ...(pluginYml.configs.prettier.rules as Rules),
        "yml/no-empty-mapping-value": "off",

        ...overrides,
      },
    },
  ];
}
