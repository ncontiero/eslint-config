import type { Linter } from "eslint";
import type { Options as PrettierOptions } from "prettier";
import type { ParserOptions } from "@typescript-eslint/parser";

export type Awaitable<T> = T | Promise<T>;
export interface Rules {}

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

export interface OptionsConfig {
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
  tailwindcss?: boolean | OptionsOverrides;

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;
}

export { PrettierOptions };
