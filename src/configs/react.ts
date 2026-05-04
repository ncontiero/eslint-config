import type {
  FlatConfigItem,
  OptionsFiles,
  OptionsHasTanStackReactQuery,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from "../types";
import { isPackageExists } from "local-pkg";
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_TS, GLOB_TSX } from "../globs";
import { ensurePackages, interopDefault } from "../utils";

// react refresh
const ReactRefreshAllowPackages = ["vite"];
const ReactRouterPackages = [
  "@react-router/node",
  "@react-router/react",
  "@react-router/serve",
  "@react-router/dev",
];
const NextJsPackages = ["next"];

export async function react(
  options: OptionsTypeScriptParserOptions &
    OptionsTypeScriptWithTypes &
    OptionsOverrides &
    OptionsFiles &
    OptionsHasTanStackReactQuery = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_SRC],
    filesTypeAware = [GLOB_TS, GLOB_TSX],
    ignoresTypeAware = [`${GLOB_MARKDOWN}/**`],
    overrides = {},
    reactQuery,
    tsconfigPath,
  } = options;

  if (reactQuery) {
    ensurePackages(["@tanstack/eslint-plugin-query"]);
  }

  const isTypeAware = !!tsconfigPath;

  const typeAwareRules: FlatConfigItem["rules"] = {
    "react/no-leaked-conditional-rendering": "error",
    "react/no-unused-props": "warn",
  };

  const [pluginReact, pluginReactRefresh] = await Promise.all([
    interopDefault(import("@eslint-react/eslint-plugin")),
    interopDefault(import("eslint-plugin-react-refresh")),
  ] as const);

  const isAllowConstantExport = ReactRefreshAllowPackages.some((i) =>
    isPackageExists(i),
  );
  const isUsingReactRouter = ReactRouterPackages.some((i) =>
    isPackageExists(i),
  );
  const isUsingNextJs = NextJsPackages.some((i) => isPackageExists(i));

  return [
    {
      name: "ncontiero/react/setup",
      plugins: {
        react: pluginReact,
        "react-refresh": pluginReactRefresh,
      },
    },
    reactQuery
      ? {
          ...(await interopDefault(import("@tanstack/eslint-plugin-query")))
            .configs["flat/recommended"][0],
          name: "ncontiero/tanstack-query",
        }
      : {},
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: "module",
      },
      name: "ncontiero/react/rules",
      rules: {
        ...pluginReact.configs.recommended.rules,

        // react refresh
        "react-refresh/only-export-components": [
          "warn",
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUsingNextJs
                ? [
                    // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
                    "experimental_ppr",
                    "dynamic",
                    "dynamicParams",
                    "revalidate",
                    "fetchCache",
                    "runtime",
                    "preferredRegion",
                    "maxDuration",
                    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
                    "metadata",
                    "generateMetadata",
                    // https://nextjs.org/docs/app/api-reference/functions/generate-viewport
                    "viewport",
                    "generateViewport",
                    // https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
                    "generateImageMetadata",
                    // https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
                    "generateSitemaps",
                    // https://nextjs.org/docs/app/api-reference/functions/generate-static-params
                    "generateStaticParams",
                  ]
                : []),
              ...(isUsingReactRouter
                ? [
                    "meta",
                    "links",
                    "headers",
                    "loader",
                    "action",
                    "clientLoader",
                    "clientAction",
                    "handle",
                    "shouldRevalidate",
                  ]
                : []),
            ],
          },
        ],

        // react-dom
        "react/dom-no-missing-button-type": "warn",
        "react/dom-no-missing-iframe-sandbox": "warn",
        "react/dom-no-unsafe-target-blank": "warn",
        // react
        "react/globals": "warn",
        "react/immutability": "warn",
        "react/jsx-no-useless-fragment": "warn",
        "react/no-duplicate-key": "warn",
        "react/no-missing-component-display-name": "warn",
        "react/no-unstable-context-value": "warn",
        "react/no-unstable-default-props": "warn",
        "react/no-unused-state": "warn",
        "react/refs": "warn",

        ...overrides,
      },
    },
    {
      files: filesTypeAware,
      name: "ncontiero/react/typescript",
      rules: {
        // Disables rules that are already handled by TypeScript
        "react/dom-no-string-style-prop": "off",
        "react/dom-no-unknown-property": "off",
      },
    },
    ...(isTypeAware
      ? [
          {
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            name: "ncontiero/react/type-aware-rules",
            rules: {
              ...typeAwareRules,
            },
          },
        ]
      : []),
  ];
}
