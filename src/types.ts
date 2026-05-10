import type { ParserOptions } from "@typescript-eslint/parser";
import type { Linter } from "eslint";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { Options as PrettierOptions } from "prettier";
import type { ConfigNames, RuleOptions } from "./typegen";

export type Awaitable<T> = T | Promise<T>;
export interface Rules extends RuleOptions {}

export type { ConfigNames, PrettierOptions };

export interface FlatConfigItem extends Omit<
  Linter.Config<Linter.RulesRecord & Rules>,
  "plugins"
> {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
}

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[];
}

export interface OptionsOverrides {
  overrides?: Rules;
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * Glob patterns for files that should be type aware.
   * @default ["**\/*.{ts,tsx}"]
   */
  filesTypeAware?: string[];

  /**
   * Glob patterns for files that should not be type aware.
   * @default ["**\/*.md\/**"]
   */
  ignoresTypeAware?: string[];
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;

  /**
   * Override type aware rules.
   */
  overridesTypeAware?: Rules;
}

export type OptionsTypescript =
  | (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides);

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsHasNextJs {
  nextJs?: boolean;
}

export interface OptionsHasRegexp {
  regexp?: boolean;
}

export interface StyleConfig {
  indent?: number;
  semi?: boolean;
  quotes?: "single" | "double";
}
export interface StyleOptions {
  style?: boolean | StyleConfig;
}

export interface OptionsUnicorn extends OptionsOverrides {
  /**
   * Include all rules recommended by `eslint-plugin-unicorn`, instead of just the chosen ones.
   *
   * @default false
   */
  allRecommended?: boolean;
}

export interface HTMLOptions extends OptionsOverrides {
  /**
   * Custom template engine syntax to be recognized by the HTML parser.
   * This allows the parser to correctly handle template delimiters like `{{...}}` or `{%...%}`.
   *
   * @see https://html-eslint.org/docs/integrating-template-engine
   * @default { "{{": "}}", "{%": "%}" }
   */
  templateEngineSyntax?: Record<string, string>;
}

export interface OptionsTailwindCSS extends OptionsOverrides {
  /**
   * Path to the Tailwind CSS config file.
   *
   * @default "tailwind.config.ts"
   */
  configPath?: string;
  /**
   * Path to the global CSS file.
   *
   * @default "src/app/globals.css"
   */
  cssGlobalPath?: string;
  /**
   * The working directory used to resolve `tailwindcss` and related config files.
   * This is useful for monorepos where linting runs from the repository root
   * but each project has its own `node_modules` and Tailwind setup.
   */
  cwd?: string;
}

export interface OptionsE18e extends OptionsOverrides {
  /**
   * Include modernization rules
   *
   * @see https://github.com/e18e/eslint-plugin#modernization
   * @default true
   */
  modernization?: boolean;
  /**
   * Include module replacements rules
   *
   * @see https://github.com/e18e/eslint-plugin#module-replacements
   * @default false
   */
  moduleReplacements?: boolean;
  /**
   * Include performance improvements rules
   *
   * @see https://github.com/e18e/eslint-plugin#performance-improvements
   * @default true
   */
  performanceImprovements?: boolean;
}

export interface OptionsJSXA11y extends OptionsOverrides {
  // Add future a11y-specific options here
}

export interface OptionsJSX {
  /**
   * Enable JSX accessibility rules.
   *
   * Can be a boolean or an object for custom options and overrides.
   * @default false
   */
  a11y?: boolean | OptionsJSXA11y;
}

export interface OptionsConfig {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions;

  /** Core rules. Can't be disabled. */
  javascript?: OptionsOverrides;

  /**
   * Enable Node.js rules
   *
   * @default true
   */
  node?: boolean;

  /**
   * Enable JSDoc rules
   *
   * @default true
   */
  jsdoc?: boolean;

  /**
   * Enable De Morgan rules.
   *
   * @see [eslint-plugin-de-morgan](https://github.com/azat-io/eslint-plugin-de-morgan)
   * @default true
   */
  deMorgan?: boolean;

  /**
   * Options for eslint-plugin-promise.
   *
   * @default true
   */
  promise?: boolean | OptionsOverrides;

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;

  /**
   * Enable JSX related rules.
   *
   * Passing an object to enable JSX accessibility rules.
   *
   * @default true
   */
  jsx?: boolean | OptionsJSX;

  /**
   * Options for eslint-plugin-unicorn.
   *
   * @default true
   */
  unicorn?: boolean | OptionsUnicorn;

  /**
   * Options for [@e18e/eslint-plugin](https://github.com/e18e/eslint-plugin)
   *
   * @default true
   */
  e18e?: boolean | OptionsE18e;

  /**
   * Options for eslint-plugin-import-x.
   *
   * @default true
   */
  imports?: boolean | OptionsOverrides;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsOverrides;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean | OptionsOverrides;

  /**
   * Enable TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsOverrides;

  /**
   * Enable Markdown support.
   *
   * @default true
   */
  markdown?: boolean | OptionsOverrides;

  /**
   * Enable regexp rules.
   *
   * @see https://ota-meshi.github.io/eslint-plugin-regexp/
   * @default true
   */
  regexp?: boolean | OptionsOverrides;

  /**
   * Enable HTML linting.
   *
   * @see https://html-eslint.org/
   * @default true
   */
  html?: boolean | HTMLOptions;

  /**
   * Enable Prettier support.
   *
   * Pass an object to enable Prettier support with custom options.
   *
   * @default true
   */
  prettier?: boolean | PrettierOptions;

  /**
   * Enable React support.
   *
   * @default auto-detect based on the dependencies
   */
  react?: boolean | OptionsOverrides;

  /**
   * Enable NextJs support.
   *
   * @default auto-detect based on the dependencies
   */
  nextjs?: boolean | OptionsOverrides;

  /**
   * Enable TailwindCSS support.
   *
   * @default auto-detect based on the dependencies
   */
  tailwindcss?: boolean | OptionsTailwindCSS;

  /**
   * Enable TanStack Query support.
   *
   * Requires installing:
   * - `@tanstack/eslint-plugin-query`
   *
   * @default false
   */
  tanstackQuery?: boolean | OptionsOverrides;
}
