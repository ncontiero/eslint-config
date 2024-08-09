import type {
  FlatConfigItem,
  OptionsIsInEditor,
  OptionsOverrides,
} from "../types";
import { GLOB_HTML, GLOB_REACT } from "../globs";
import { interopDefault } from "../utils";

export async function tailwindcss(
  options: OptionsIsInEditor & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { isInEditor = false, overrides = {} } = options;

  const pluginTailwindCss = await interopDefault(
    import("eslint-plugin-tailwindcss"),
  );

  return [
    {
      name: "dkshs/tailwindcss/setup",
      plugins: {
        tailwindcss: pluginTailwindCss,
      },
      settings: {
        tailwindcss: {
          callees: ["cn", "classnames", "clsx", "cva"],
          config: "tailwind.config.ts",
          /**
           * Performance issue with the plugin, somewhat mitigated setting cssFiles to an empty array.
           * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/276
           * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/174
           */
          cssFiles: [],
          removeDuplicates: true,
        },
      },
    },
    {
      files: [GLOB_REACT, GLOB_HTML],
      name: "dkshs/tailwindcss",
      rules: {
        "tailwindcss/classnames-order": isInEditor ? "off" : "warn",
        "tailwindcss/enforces-negative-arbitrary-values": ["warn"],
        "tailwindcss/enforces-shorthand": ["warn"],
        "tailwindcss/no-contradicting-classname": ["error"],
        "tailwindcss/no-custom-classname": ["warn"],
        ...overrides,
      },
    },
  ];
}
