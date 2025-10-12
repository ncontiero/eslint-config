import { isPackageExists } from "local-pkg";

export const hasTypeScript = isPackageExists("typescript");
export const hasReact = isPackageExists("react");
export const hasNextJs = isPackageExists("next");
export const hasTailwind = isPackageExists("tailwindcss");
export const hasTanStackReactQuery = isPackageExists("@tanstack/react-query");
