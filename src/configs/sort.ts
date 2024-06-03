import type { FlatConfigItem } from "../types";

export function sortPackageJson(): FlatConfigItem[] {
  return [
    {
      files: ["**/package.json"],
      rules: {
        "jsonc/sort-array-values": [
          "error",
          {
            order: { type: "asc" },
            pathPattern: "^files$",
          },
        ],
        "jsonc/sort-keys": [
          "error",
          {
            order: [
              "publisher",
              "name",
              "displayName",
              "type",
              "version",
              "private",
              "packageManager",
              "description",
              "author",
              "contributors",
              "license",
              "funding",
              "homepage",
              "repository",
              "bugs",
              "keywords",
              "categories",
              "sideEffects",
              "exports",
              "main",
              "module",
              "unpkg",
              "jsdelivr",
              "browser",
              "types",
              "typesVersions",
              "bin",
              "icon",
              "files",
              "directories",
              "publishConfig",
              "scripts",
              "peerDependencies",
              "peerDependenciesMeta",
              "optionalDependencies",
              "dependencies",
              "devDependencies",
              "engines",
              "config",
              "overrides",
              "pnpm",
              "husky",
              "lint-staged",
              "eslintConfig",
              "prettier",
            ],
            pathPattern: "^$",
          },
          {
            order: { type: "asc" },
            pathPattern:
              "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
          },
          {
            order: ["types", "require", "import", "default"],
            pathPattern: "^exports.*$",
          },
          {
            order: { type: "asc" },
            pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
          },
        ],
      },
    },
  ];
}

export function sortTsconfig(): FlatConfigItem[] {
  return [
    {
      files: ["**/tsconfig.json", "**/tsconfig.*.json"],
      rules: {
        "jsonc/sort-keys": [
          "error",
          {
            order: [
              "extends",
              "compilerOptions",
              "references",
              "files",
              "include",
              "exclude",
            ],
            pathPattern: "^$",
          },
          {
            order: [
              /* Projects */
              "incremental",
              "composite",
              "tsBuildInfoFile",
              "disableSourceOfProjectReferenceRedirect",
              "disableSolutionSearching",
              "disableReferencedProjectLoad",
              /* Language and Environment */
              "target",
              "jsx",
              "jsxFactory",
              "jsxFragmentFactory",
              "jsxImportSource",
              "lib",
              "moduleDetection",
              "noLib",
              "reactNamespace",
              "useDefineForClassFields",
              "emitDecoratorMetadata",
              "experimentalDecorators",
              /* Modules */
              "baseUrl",
              "rootDir",
              "rootDirs",
              "customConditions",
              "module",
              "moduleResolution",
              "moduleSuffixes",
              "noResolve",
              "paths",
              "resolveJsonModule",
              "resolvePackageJsonExports",
              "resolvePackageJsonImports",
              "typeRoots",
              "types",
              "allowArbitraryExtensions",
              "allowImportingTsExtensions",
              "allowUmdGlobalAccess",
              /* JavaScript Support */
              "allowJs",
              "checkJs",
              "maxNodeModuleJsDepth",
              /* Type Checking */
              "strict",
              "strictBindCallApply",
              "strictFunctionTypes",
              "strictNullChecks",
              "strictPropertyInitialization",
              "allowUnreachableCode",
              "allowUnusedLabels",
              "alwaysStrict",
              "exactOptionalPropertyTypes",
              "noFallthroughCasesInSwitch",
              "noImplicitAny",
              "noImplicitOverride",
              "noImplicitReturns",
              "noImplicitThis",
              "noPropertyAccessFromIndexSignature",
              "noUncheckedIndexedAccess",
              "noUnusedLocals",
              "noUnusedParameters",
              "useUnknownInCatchVariables",
              /* Emit */
              "declaration",
              "declarationDir",
              "declarationMap",
              "downlevelIteration",
              "emitBOM",
              "emitDeclarationOnly",
              "importHelpers",
              "importsNotUsedAsValues",
              "inlineSourceMap",
              "inlineSources",
              "isolatedDeclarations",
              "mapRoot",
              "newLine",
              "noEmit",
              "noEmitHelpers",
              "noEmitOnError",
              "outDir",
              "outFile",
              "preserveConstEnums",
              "preserveValueImports",
              "removeComments",
              "sourceMap",
              "sourceRoot",
              "stripInternal",
              /* Interop Constraints */
              "allowSyntheticDefaultImports",
              "esModuleInterop",
              "forceConsistentCasingInFileNames",
              "isolatedModules",
              "preserveSymlinks",
              "verbatimModuleSyntax",
              /* Completeness */
              "skipDefaultLibCheck",
              "skipLibCheck",
            ],
            pathPattern: "^compilerOptions$",
          },
        ],
      },
    },
  ];
}
