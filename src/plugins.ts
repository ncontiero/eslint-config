/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

type InteropDefault<T> = T extends { default: infer U } ? U : T;

/* #__NO_SIDE_EFFECTS__ */
function interopDefault<T>(m: T): InteropDefault<T> {
  return (m as any).default || m;
}

import * as _pluginAntfu from "eslint-plugin-antfu";
export const pluginAntfu: typeof import("eslint-plugin-antfu").default =
  interopDefault(_pluginAntfu);

import * as _pluginComments from "eslint-plugin-eslint-comments";
export const pluginComments = interopDefault(_pluginComments);

import * as _pluginUnicorn from "eslint-plugin-unicorn";
export const pluginUnicorn = interopDefault(_pluginUnicorn);

import * as _pluginNode from "eslint-plugin-n";
export const pluginNode = interopDefault(_pluginNode);

import * as _pluginPromise from "eslint-plugin-promise";
export const pluginPromise = interopDefault(_pluginPromise);

import * as _pluginPerfectionist from "eslint-plugin-perfectionist";
export const pluginPerfectionist = interopDefault(_pluginPerfectionist);

export * as pluginImport from "eslint-plugin-import-x";
export * as pluginUnusedImports from "eslint-plugin-unused-imports";
