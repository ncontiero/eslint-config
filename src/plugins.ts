/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export type InteropDefault<T> = T extends { default: infer U } ? U : T;

/* #__NO_SIDE_EFFECTS__ */
export function interopDefault<T>(m: T): InteropDefault<T> {
  return (m as any).default || m;
}

import * as _pluginAntfu from "eslint-plugin-antfu";
export const pluginAntfu: typeof import("eslint-plugin-antfu").default =
  interopDefault(_pluginAntfu);

import * as _pluginComments from "eslint-plugin-eslint-comments";
export const pluginComments = interopDefault(_pluginComments);

import * as _pluginMarkdown from "eslint-plugin-markdown";
export const pluginMarkdown = interopDefault(_pluginMarkdown);

import tseslint from "typescript-eslint";
export { tseslint };

import * as _pluginUnicorn from "eslint-plugin-unicorn";
export const pluginUnicorn = interopDefault(_pluginUnicorn);

import * as _pluginNode from "eslint-plugin-n";
export const pluginNode = interopDefault(_pluginNode);

import * as _pluginPromise from "eslint-plugin-promise";
export const pluginPromise = interopDefault(_pluginPromise);

// React
import * as _pluginA11y from "eslint-plugin-jsx-a11y";
export const pluginA11y = interopDefault(_pluginA11y);
import * as _pluginReact from "eslint-plugin-react";
export const pluginReact = interopDefault(_pluginReact);
import * as _pluginReactHooks from "eslint-plugin-react-hooks";
export const pluginReactHooks = interopDefault(_pluginReactHooks);
import * as _pluginReactRefresh from "eslint-plugin-react-refresh";
export const pluginReactRefresh = interopDefault(_pluginReactRefresh);

import * as _pluginNextJs from "@next/eslint-plugin-next";
export const pluginNextJs = interopDefault(_pluginNextJs);

import * as _pluginTailwindCss from "eslint-plugin-tailwindcss";
export const pluginTailwindCss = interopDefault(_pluginTailwindCss);

import * as _pluginPerfectionist from "eslint-plugin-perfectionist";
export const pluginPerfectionist = interopDefault(_pluginPerfectionist);

import * as _pluginPrettier from "eslint-plugin-prettier";
export const pluginPrettier = interopDefault(_pluginPrettier);

import * as _configPrettier from "eslint-config-prettier";
export const configPrettier = interopDefault(_configPrettier);

export * as pluginImport from "eslint-plugin-import-x";
export * as pluginJsonc from "eslint-plugin-jsonc";
export * as pluginUnusedImports from "eslint-plugin-unused-imports";
export * as pluginYml from "eslint-plugin-yml";
export * as pluginToml from "eslint-plugin-toml";

export * as parserYml from "yaml-eslint-parser";
export * as parserToml from "toml-eslint-parser";
export * as parserJsonc from "jsonc-eslint-parser";
