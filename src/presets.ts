import type { FlatESLintConfigItem } from "eslint-define-config";

import { hasNextJs, hasReact, hasTailwind } from "./env";
import {
  comments,
  ignores,
  imports,
  javascript,
  jsonc,
  markdown,
  nextjs,
  node,
  prettier,
  promise,
  react,
  sortKeys,
  sortPackageJson,
  sortTsconfig,
  tailwindcss,
  toml,
  typescript,
  unicorn,
  yml,
} from "./configs";

/** Ignore common files and include javascript support */
export const presetJavaScript = [
  ...ignores,
  ...javascript,
  ...comments,
  ...imports,
  ...unicorn,
  ...node,
  ...promise,
];
/** Includes basic json(c) file support and sorting json keys */
export const presetJsonc = [...jsonc, ...sortPackageJson, ...sortTsconfig];
/** Includes markdown, yaml, toml + `presetJsonc` support */
export const presetLangsExtensions = [
  ...markdown,
  ...yml,
  ...toml,
  ...presetJsonc,
];
/** Includes `presetJavaScript` and typescript support */
export const presetBasic = [...presetJavaScript, ...typescript, ...sortKeys];
/**
 * Includes
 * - `presetBasic` (JS+TS) support
 * - `presetLangsExtensions` (markdown, yaml, toml, jsonc) support
 * - Prettier support
 * - React support
 * - NextJs support
 * - TailwindCSS support
 */
export const presetAll = [
  ...presetBasic,
  ...presetLangsExtensions,
  ...prettier,
  ...react,
  ...nextjs,
  ...tailwindcss,
];
export { presetBasic as basic, presetAll as all };

/**
 *
 * @param config
 * @param features
 * @returns
 */
export function dkshs(
  config: FlatESLintConfigItem | FlatESLintConfigItem[] = [],
  {
    markdown: enableMarkdown = true,
    nextjs: enableNextJs = hasNextJs,
    prettier: enablePrettier = true,
    react: enableReact = hasReact,
    tailwindcss: enableTailwindCSS = hasTailwind,
  }: Partial<{
    /** Prettier support. Default: true */
    prettier: boolean;
    /** markdown support. Default: true */
    markdown: boolean;
    /** React support. Auto-enable. */
    react: boolean;
    /** NextJs support. Auto-enable. */
    nextjs: boolean;
    /** TailwindCSS support. Auto-enable. */
    tailwindcss: boolean;
    sortKeys: boolean;
  }> = {},
): FlatESLintConfigItem[] {
  const configs = [...presetBasic, ...yml, ...toml, ...presetJsonc];
  if (enableMarkdown) {
    configs.push(...markdown);
  }
  if (enableReact) {
    configs.push(...react);
  }
  if (enableNextJs) {
    configs.push(...nextjs);
  }
  if (enableTailwindCSS) {
    configs.push(...tailwindcss);
  }
  if (enablePrettier) {
    configs.push(...prettier);
  }
  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]));
  }
  return configs;
}
