import { isPackageExists } from "local-pkg";

export const isInEditorEnv = !!(
  (process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.NVIM ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM) &&
  !process.env.CI
);
export const hasTypeScript = isPackageExists("typescript");
export const hasReact = isPackageExists("react");
export const hasNextJs = isPackageExists("next");
export const hasTailwind = isPackageExists("tailwindcss");
