import type { FlatConfigItem } from "../types";

export function sortPackageJson(): FlatConfigItem[] {
  return [
    {
      files: ["**/package.json"],
      name: "ncontiero/sort/package-json",
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
              "imports",
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
              "scripts-info",
              "peerDependencies",
              "peerDependenciesMeta",
              "optionalDependencies",
              "dependencies",
              "devDependencies",
              "engines",
              "devEngines",
              "prisma",
              "config",
              "pnpm",
              "overrides",
              "resolutions",
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
          {
            order: { type: "asc" },
            pathPattern: "^workspaces\\.catalog$",
          },
          {
            order: { type: "asc" },
            pathPattern: "^workspaces\\.catalogs\\.[^.]+$",
          },
        ],
      },
    },
  ];
}

export function sortTsconfig(): FlatConfigItem[] {
  return [
    {
      files: ["**/[jt]sconfig.json", "**/[jt]sconfig.*.json"],
      name: "ncontiero/sort/tsconfig",
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
              "libReplacement",
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
              "noUncheckedSideEffectImports",
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
              "erasableSyntaxOnly",
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

export const sortPnpmWorkspace = (): FlatConfigItem[] => [
  {
    files: ["pnpm-workspace.yaml"],
    name: "ncontiero/sort/pnpm-workspace",
    rules: {
      "yml/sort-keys": [
        "error",
        {
          order: [
            // Workspace
            // @keep-sorted
            ...[
              "dedupeInjectedDeps",
              "disallowWorkspaceCycles",
              "failIfNoMatch",
              "ignoreWorkspaceCycles",
              "ignoreWorkspaceRootCheck",
              "includeWorkspaceRoot",
              "injectWorkspacePackages",
              "legacyDirFiltering",
              "linkWorkspacePackages",
              "preferWorkspacePackages",
              "saveWorkspaceProtocol",
              "sharedWorkspaceLockfile",
              "syncInjectedDepsAfterScripts",
            ],

            // Catalogs
            // @keep-sorted
            ...["catalogMode", "catalogPrune", "cleanupUnusedCatalogs"],

            // Dependency resolution
            ...[
              "allowedDeprecatedVersions",
              "blockExoticSubdeps",
              "ignoredOptionalDependencies",
              "minimumReleaseAge",
              "minimumReleaseAgeIgnoreMissingTime",
              "minimumReleaseAgeStrict",
              "minimumReleaseAgeExcludePrune",
              "minimumReleaseAgeExclude",
              "registrySupportsTimeField",
              "resolutionMode",
              "supportedArchitectures",
              "trustLockfile",
              "trustPolicy",
              "trustPolicyIgnoreAfter",
              "trustPolicyExclude",
              "update",
            ],

            // Peer dependencies
            // @keep-sorted
            ...[
              "autoInstallPeers",
              "dedupePeerDependents",
              "dedupePeers",
              "peerDependencyRules",
              "resolvePeersFromWorkspaceRoot",
              "strictPeerDependencies",
            ],

            // Registry and network
            // @keep-sorted
            ...[
              "fetchMinSpeedKiBps",
              "fetchRetries",
              "fetchRetryFactor",
              "fetchRetryMaxtimeout",
              "fetchRetryMintimeout",
              "fetchTimeout",
              "fetchWarnTimeoutMs",
              "gitShallowHosts",
              "httpProxy",
              "httpsProxy",
              "localAddress",
              "maxsockets",
              "namedRegistries",
              "networkConcurrency",
              "noProxy",
              "registries",
              "registry",
              "strictSsl",
            ],

            // node_modules
            // @keep-sorted
            ...[
              "dlxCacheMaxAge",
              "enableGlobalVirtualStore",
              "enableModulesDir",
              "extendNodePath",
              "modulesCacheMaxAge",
              "modulesDir",
              "nodeExperimentalPackageMap",
              "nodeLinker",
              "nodePackageMapType",
              "packageImportMethod",
              "preferSymlinkedExecutables",
              "symlink",
              "virtualStoreDir",
              "virtualStoreDirMaxLength",
              "virtualStoreOnly",
              "virtualStoreType",
            ],

            // Hoisting
            // @keep-sorted
            ...[
              "hoist",
              "hoistingLimits",
              "hoistPattern",
              "hoistWorkspacePackages",
              "publicHoistPattern",
              "shamefullyHoist",
            ],

            // Store
            // @keep-sorted
            ...[
              "frozenStore",
              "storeDir",
              "strictStorePkgContentCheck",
              "useRunningStoreServer",
              "verifyStoreIntegrity",
            ],

            // Lockfile
            // @keep-sorted
            ...[
              "gitBranchLockfile",
              "lockfile",
              "lockfileIncludeTarballUrl",
              "mergeGitBranchLockfilesBranchPattern",
              "peersSuffixMaxLength",
              "preferFrozenLockfile",
            ],

            // Scripts and builds
            // @keep-sorted
            ...[
              "childConcurrency",
              "dangerouslyAllowAllBuilds",
              "enablePrePostScripts",
              "ignoreDepScripts",
              "ignoreScripts",
              "nodeOptions",
              "requiredScripts",
              "scriptShell",
              "shellEmulator",
              "sideEffectsCache",
              "sideEffectsCacheReadonly",
              "strictDepBuilds",
              "unsafePerm",
              "verifyDepsBeforeRun",
            ],

            // Node.js and package manager versions
            // @keep-sorted
            ...[
              "managePackageManagerVersions",
              "nodeDownloadMirrors",
              "nodeVersion",
              "packageManagerStrict",
              "packageManagerStrictVersion",
              "pmOnFail",
              "runtimeOnFail",
            ],

            // CLI and output
            // @keep-sorted
            ...[
              "ci",
              "color",
              "engineStrict",
              "loglevel",
              "npmPath",
              "recursiveInstall",
              "updateNotifier",
              "useBetaCli",
              "useStderr",
            ],

            // Directories and pnpmfile
            // @keep-sorted
            ...[
              "cacheDir",
              "globalBinDir",
              "globalDir",
              "globalPnpmfile",
              "globalShims",
              "ignorePnpmfile",
              "npmrcAuthFile",
              "pnpmfile",
              "stateDir",
            ],

            // Audit and versioning
            // @keep-sorted
            ...["audit", "versioning"],

            // Misc
            // @keep-sorted
            ...[
              "allowNonAppliedPatches",
              "dedupeDirectDeps",
              "deployAllFiles",
              "ignoreCompatibilityDb",
              "initAuthorEmail",
              "initAuthorName",
              "initAuthorUrl",
              "initLicense",
              "initVersion",
              "optimisticRepeatInstall",
              "saveExact",
              "savePrefix",
              "tag",
            ],

            // Workspace layout and dependency declarations, ordered by how
            // a `pnpm-workspace.yaml` usually reads top to bottom
            "packages",
            "packageConfigs",
            "overrides",
            "packageExtensions",
            "patchedDependencies",
            "configDependencies",

            // Build approvals
            "allowBuilds",
            // Superseded by `allowBuilds` in pnpm v11
            // @keep-sorted
            ...[
              "ignoredBuiltDependencies",
              "neverBuiltDependencies",
              "onlyBuiltDependencies",
              "onlyBuiltDependenciesFile",
            ],

            // Catalogs, usually the largest blocks
            "catalog",
            "catalogs",
          ],
          pathPattern: "^$",
        },
        {
          order: { type: "asc" },
          pathPattern: ".*",
        },
      ],
    },
  },
];
