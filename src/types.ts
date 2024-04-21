import type { FlatESLintConfigItem, Rules } from "eslint-define-config";
import type { Options as PrettierOptions } from "prettier";
import type { ParserOptions } from "@typescript-eslint/parser";

export type Awaitable<T> = T | Promise<T>;

export type FlatConfigItem = FlatESLintConfigItem;

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

export { Rules, PrettierOptions };
