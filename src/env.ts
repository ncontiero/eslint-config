import { isPackageExists } from "local-pkg";

export const hasTypeScript = isPackageExists("typescript");
export const hasReact = isPackageExists("react");
export const hasNextJs = isPackageExists("next");
export const hasTailwind = isPackageExists("tailwindcss");

const tanstackQueryPackages = [
  "@tanstack/react-query",
  "@tanstack/preact-query",
  "@tanstack/vue-query",
  "@tanstack/solid-query",
  "@tanstack/svelte-query",
];
export const hasTanStackQuery = tanstackQueryPackages.some((i) =>
  isPackageExists(i),
);
