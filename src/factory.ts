import type { Linter } from "eslint";
import type {
  Awaitable,
  FlatConfigItem,
  OptionsConfig,
  PrettierOptions,
  Rules,
  StyleConfig,
} from "./types";
import {
  command,
  comments,
  deMorgan,
  e18e,
  html,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  nextJs,
  node,
  perfectionist,
  prettier,
  promise,
  react,
  regexp,
  sortPackageJson,
  sortTsconfig,
  tailwindcss,
  tanstackQuery,
  toml,
  typescript,
  unicorn,
  yml,
} from "./configs";
import { hasNextJs, hasReact, hasTailwind, hasTypeScript } from "./env";
import { composer, interopDefault } from "./utils";

const flatConfigProps = [
  "name",
  "languageOptions",
  "linterOptions",
  "processor",
  "plugins",
  "rules",
  "settings",
] satisfies (keyof FlatConfigItem)[];

export const defaultPluginRenaming = {
  "@eslint-react": "react",
  "@typescript-eslint": "ts",
};

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === "boolean"
    ? ({} as any)
    : options[key] || ({} as any);
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): Partial<Linter.RulesRecord & Rules> {
  const sub = resolveSubOptions(options, key);
  return {
    ...("overrides" in options ? (options.overrides as any) : {})?.[key],
    ...("overrides" in sub ? sub.overrides : ({} as any)),
  };
}

function getStyleOptions(options: PrettierOptions): StyleConfig | false {
  if ("tabWidth" in options || "singleQuote" in options || "semi" in options) {
    return {
      indent: options.tabWidth || 2,
      quotes: options.singleQuote ? "single" : "double",
      semi: options.semi ?? true,
    };
  }
  return false;
}

/**
 * Merges ESLint configurations with optional support for Markdown, React, Next.js, TailwindCSS, and Prettier.
 *
 * @param options - Optional settings for Markdown, React, Next.js, TailwindCSS and Prettier.
 * @param userConfigs - The user configurations to be merged with the generated configurations.
 * @returns Merged ESLint configurations based on provided options.
 */
export function ncontiero(
  options: OptionsConfig & Omit<FlatConfigItem, "files"> = {},
  ...userConfigs: Awaitable<
    FlatConfigItem | FlatConfigItem[] | Linter.Config[]
  >[]
) {
  const {
    deMorgan: enableDeMorgan = true,
    e18e: enableE18e = true,
    gitignore: enableGitignore = true,
    html: enableHtml = true,
    ignores: userIgnores = [],
    imports: enableImports = true,
    jsdoc: enableJsdoc = true,
    jsonc: enableJsonc = true,
    jsx: enableJsx = true,
    markdown: enableMarkdown = true,
    nextjs: enableNextJs = hasNextJs,
    node: enableNode = true,
    prettier: enablePrettier = true,
    promise: enablePromise = true,
    react: enableReact = hasReact,
    regexp: enableRegexp = true,
    tailwindcss: enableTailwindCSS = hasTailwind,
    tanstackQuery: enableTanStackQuery = false,
    typescript: enableTypescript = hasTypeScript,
    unicorn: enableUnicorn = true,
  } = options;

  const prettierOptions =
    typeof options.prettier === "object" ? options.prettier : {};
  const styleOptions = getStyleOptions(prettierOptions);

  const configs: Awaitable<FlatConfigItem[]>[] = [];

  if (enableGitignore) {
    if (typeof enableGitignore !== "boolean") {
      configs.push(
        interopDefault(import("eslint-config-flat-gitignore")).then((r) => [
          r({ name: "ncontiero/gitignore", ...enableGitignore }),
        ]),
      );
    } else {
      configs.push(
        interopDefault(import("eslint-config-flat-gitignore")).then((r) => [
          r({ name: "ncontiero/gitignore", strict: false }),
        ]),
      );
    }
  }

  const typescriptOptions = resolveSubOptions(options, "typescript");
  const tsconfigPath =
    "tsconfigPath" in typescriptOptions
      ? typescriptOptions.tsconfigPath
      : undefined;

  // Base configs
  configs.push(
    ignores(userIgnores, !enableTypescript),
    javascript({ overrides: getOverrides(options, "javascript") }),
    comments(),
    command(),
    perfectionist(),
  );

  if (enableNode) {
    configs.push(node());
  }

  if (enablePromise) {
    configs.push(promise({ overrides: getOverrides(options, "promise") }));
  }

  if (enableJsdoc) {
    configs.push(jsdoc());
  }

  if (enableImports) {
    configs.push(
      imports({
        nextJs: !!enableNextJs,
        overrides: getOverrides(options, "imports"),
      }),
    );
  }

  if (enableDeMorgan) {
    configs.push(deMorgan());
  }

  if (enableE18e) {
    configs.push(e18e(enableE18e === true ? {} : enableE18e));
  }

  if (enableUnicorn) {
    configs.push(
      unicorn(
        enableUnicorn === true ? { regexp: !!enableRegexp } : enableUnicorn,
      ),
    );
  }

  if (enableJsx) {
    configs.push(jsx(enableJsx === true ? {} : enableJsx));
  }

  if (enableTypescript) {
    configs.push(
      typescript({
        ...typescriptOptions,
        overrides: getOverrides(options, "typescript"),
        tsconfigPath,
      }),
    );
  }

  if (enableTanStackQuery) {
    configs.push(
      tanstackQuery({
        overrides: getOverrides(options, "tanstackQuery"),
      }),
    );
  }

  if (enableJsonc) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, "jsonc"),
        style: styleOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (options.yaml ?? true) {
    configs.push(
      yml({
        overrides: getOverrides(options, "yaml"),
        style: styleOptions,
      }),
    );
  }

  if (options.toml ?? true) {
    configs.push(
      toml({
        overrides: getOverrides(options, "toml"),
        style: styleOptions,
      }),
    );
  }

  if (enableMarkdown) {
    configs.push(markdown({ overrides: getOverrides(options, "markdown") }));
  }

  if (enableRegexp) {
    configs.push(regexp(typeof enableRegexp === "boolean" ? {} : enableRegexp));
  }

  if (enableReact) {
    configs.push(
      react({
        ...typescriptOptions,
        overrides: getOverrides(options, "react"),
        tsconfigPath,
      }),
    );
  }

  if (enableNextJs) {
    configs.push(nextJs({ overrides: getOverrides(options, "nextjs") }));
  }

  if (enableHtml) {
    configs.push(
      html({
        ...resolveSubOptions(options, "html"),
        overrides: getOverrides(options, "html"),
      }),
    );
  }

  if (enableTailwindCSS) {
    configs.push(
      tailwindcss({
        tsconfigPath,
        ...resolveSubOptions(options, "tailwindcss"),
        overrides: getOverrides(options, "tailwindcss"),
      }),
    );
  }

  if (enablePrettier) {
    configs.push(prettier(prettierOptions));
  }

  if ("files" in options) {
    throw new Error(
      '[@ncontiero/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.',
    );
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) acc[key] = options[key] as any;
    return acc;
  }, {} as FlatConfigItem);
  if (Object.keys(fusedConfig).length > 0) configs.push([fusedConfig]);

  return composer({
    configs: [...configs, ...(userConfigs as any)],
    pluginsNameMap: defaultPluginRenaming,
  });
}
