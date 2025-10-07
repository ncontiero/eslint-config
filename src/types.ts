import type { ParserOptions } from "@typescript-eslint/parser";
import type { Linter } from "eslint";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { Options as PrettierOptions } from "prettier";
import type { RuleOptions } from "./typegen";

export type Awaitable<T> = T | Promise<T>;
export interface Rules extends RuleOptions {}

export interface FlatConfigItem
  extends Omit<Linter.Config<Linter.RulesRecord & Rules>, "plugins"> {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
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
}

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsHasNextJs {
  nextJs?: boolean;
}

export interface OptionsHasRegexp {
  regexp?: boolean;
}

export interface OptionsHasTanStackReactQuery {
  reactQuery?: boolean;
}

export type OptionsTypescript = OptionsTypeScriptParserOptions &
  OptionsOverrides;

export interface OptionsIsInEditor {
  isInEditor?: boolean;
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
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;

  /**
   * Options for eslint-plugin-unicorn.
   *
   * @default true
   */
  unicorn?: boolean | OptionsUnicorn;

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
   * Enable TanStack React Query support.
   *
   * @default auto-detect based on the dependencies
   */
  reactQuery?: boolean;

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;
}

export { PrettierOptions };
