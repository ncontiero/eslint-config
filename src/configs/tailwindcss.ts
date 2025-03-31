import type {
  FlatConfigItem,
  OptionsIsInEditor,
  OptionsOverrides,
} from "../types";
import { getPackageInfoSync } from "local-pkg";
import { GLOB_HTML, GLOB_REACT } from "../globs";
import { interopDefault } from "../utils";

export async function tailwindcss(
  options: OptionsIsInEditor & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const { isInEditor = false, overrides = {} } = options;

  if (getPackageInfoSync("tailwindcss")?.version?.startsWith("4")) {
    console.warn("[@dkshs/eslint-config] TailwindCSS v4 is not supported yet.");
    return [];
  }

  const pluginTailwindCss = await interopDefault(
    import("eslint-plugin-tailwindcss"),
  );

  return [
    {
      name: "ncontiero/tailwindcss/setup",
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
      name: "ncontiero/tailwindcss/rules",
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
