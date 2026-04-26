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

  const [pluginA11y, pluginReact, pluginReactRefresh] = await Promise.all([
    interopDefault(import("eslint-plugin-jsx-a11y")),
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
        "jsx-a11y": pluginA11y,
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

        // a11y rules
        "jsx-a11y/alt-text": [
          "warn",
          {
            area: [],
            elements: ["img", "object", "area", 'input[type="image"]'],
            img: [],
            'input[type="image"]': [],
            object: [],
          },
        ],
        "jsx-a11y/anchor-has-content": ["warn", { components: [] }],
        "jsx-a11y/anchor-is-valid": [
          "warn",
          {
            aspects: ["noHref", "invalidHref", "preferButton"],
            components: ["Link"],
            specialLink: ["to"],
          },
        ],
        "jsx-a11y/aria-activedescendant-has-tabindex": ["warn"],
        "jsx-a11y/aria-props": ["warn"],
        "jsx-a11y/aria-proptypes": ["warn"],
        "jsx-a11y/aria-role": ["warn", { ignoreNonDOM: false }],
        "jsx-a11y/aria-unsupported-elements": ["warn"],
        "jsx-a11y/autocomplete-valid": ["off", { inputComponents: [] }],
        "jsx-a11y/click-events-have-key-events": ["warn"],
        "jsx-a11y/control-has-associated-label": [
          "warn",
          {
            controlComponents: [],
            depth: 5,
            ignoreElements: [
              "audio",
              "canvas",
              "embed",
              "input",
              "textarea",
              "tr",
              "video",
            ],
            ignoreRoles: [
              "grid",
              "listbox",
              "menu",
              "menubar",
              "radiogroup",
              "row",
              "tablist",
              "toolbar",
              "tree",
              "treegrid",
            ],
            labelAttributes: ["label"],
          },
        ],
        "jsx-a11y/heading-has-content": ["warn", { components: [""] }],
        "jsx-a11y/html-has-lang": ["warn"],
        "jsx-a11y/iframe-has-title": ["warn"],
        "jsx-a11y/img-redundant-alt": ["warn"],
        "jsx-a11y/interactive-supports-focus": ["warn"],
        "jsx-a11y/label-has-associated-control": "warn",
        "jsx-a11y/lang": ["warn"],
        "jsx-a11y/media-has-caption": [
          "warn",
          {
            audio: [],
            track: [],
            video: [],
          },
        ],
        "jsx-a11y/mouse-events-have-key-events": ["warn"],
        "jsx-a11y/no-access-key": ["warn"],
        "jsx-a11y/no-autofocus": ["warn", { ignoreNonDOM: true }],
        "jsx-a11y/no-distracting-elements": [
          "warn",
          { elements: ["marquee", "blink"] },
        ],
        "jsx-a11y/no-interactive-element-to-noninteractive-role": [
          "warn",
          { tr: ["none", "presentation"] },
        ],
        "jsx-a11y/no-noninteractive-element-interactions": [
          "warn",
          {
            handlers: [
              "onClick",
              "onMouseDown",
              "onMouseUp",
              "onKeyPress",
              "onKeyDown",
              "onKeyUp",
            ],
          },
        ],
        "jsx-a11y/no-noninteractive-element-to-interactive-role": [
          "warn",
          {
            li: ["menuitem", "option", "row", "tab", "treeitem"],
            ol: [
              "listbox",
              "menu",
              "menubar",
              "radiogroup",
              "tablist",
              "tree",
              "treegrid",
            ],
            table: ["grid"],
            td: ["gridcell"],
            ul: [
              "listbox",
              "menu",
              "menubar",
              "radiogroup",
              "tablist",
              "tree",
              "treegrid",
            ],
          },
        ],
        "jsx-a11y/no-noninteractive-tabindex": [
          "warn",
          { roles: ["tabpanel"], tags: [] },
        ],
        "jsx-a11y/no-redundant-roles": ["warn"],
        "jsx-a11y/no-static-element-interactions": [
          "off",
          {
            handlers: [
              "onClick",
              "onMouseDown",
              "onMouseUp",
              "onKeyPress",
              "onKeyDown",
              "onKeyUp",
            ],
          },
        ],
        "jsx-a11y/role-has-required-aria-props": ["warn"],
        "jsx-a11y/role-supports-aria-props": ["warn"],
        "jsx-a11y/scope": ["warn"],
        "jsx-a11y/tabindex-no-positive": ["warn"],

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
