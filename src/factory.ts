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
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
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
  toml,
  typescript,
  unicorn,
  yml,
} from "./configs";
import {
  hasNextJs,
  hasReact,
  hasTailwind,
  hasTanStackReactQuery,
  hasTypeScript,
  isInEditorEnv,
} from "./env";
import { GLOB_TS, GLOB_TSX } from "./globs";
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
    gitignore: enableGitignore = true,
    isInEditor = isInEditorEnv,
    nextjs: enableNextJs = hasNextJs,
    react: enableReact = hasReact,
    reactQuery: enableTanStackReactQuery = hasTanStackReactQuery,
    regexp: enableRegexp = true,
    tailwindcss: enableTailwindCSS = hasTailwind,
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

  if (!enableTypescript) {
    options.ignores
      ? options.ignores.push(GLOB_TS, GLOB_TSX)
      : (options.ignores = [GLOB_TS, GLOB_TSX]);
  }

  // Base configs
  configs.push(
    ignores(options.ignores),
    javascript({ isInEditor, overrides: getOverrides(options, "javascript") }),
    comments(),
    jsdoc(),
    imports({ nextJs: enableNextJs === true }),
    node(),
    promise(),
    command(),
    perfectionist(),
    deMorgan(),
  );

  if (enableUnicorn) {
    configs.push(
      unicorn(
        enableUnicorn === true ? { regexp: !!enableRegexp } : enableUnicorn,
      ),
    );
  }

  if (enableTypescript) {
    configs.push(
      typescript({
        ...resolveSubOptions(options, "typescript"),
        overrides: getOverrides(options, "typescript"),
      }),
    );
  }

  if (options.jsonc ?? true) {
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

  if (options.markdown ?? true) {
    configs.push(markdown({ overrides: getOverrides(options, "markdown") }));
  }

  if (enableRegexp) {
    configs.push(regexp(typeof enableRegexp === "boolean" ? {} : enableRegexp));
  }

  if (enableReact) {
    configs.push(
      react({
        overrides: getOverrides(options, "react"),
        reactQuery: !!enableTanStackReactQuery,
        typescript: !!enableTypescript,
      }),
    );
  }

  if (enableNextJs) {
    configs.push(nextJs({ overrides: getOverrides(options, "nextjs") }));
  }

  if (enableTailwindCSS) {
    configs.push(
      tailwindcss({
        isInEditor,
        overrides: getOverrides(options, "tailwindcss"),
      }),
    );
  }

  if (options.prettier ?? true) configs.push(prettier(prettierOptions));

  if ("files" in options) {
    throw new Error(
      '[@dkshs/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.',
    );
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) acc[key] = options[key] as any;
    return acc;
  }, {} as FlatConfigItem);
  if (Object.keys(fusedConfig).length > 0) configs.push([fusedConfig]);

  return composer(...configs, ...(userConfigs as any));
}
