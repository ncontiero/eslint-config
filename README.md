# @dkshs/eslint-config

DKSHS's ESLint config preset for JavaScript, TypeScript, and Prettier.

[![Version](https://img.shields.io/npm/v/@dkshs/eslint-config)](https://www.npmjs.com/package/@dkshs/eslint-config)
[![License](https://img.shields.io/badge/licence-MIT-blue)](https://github.com/dkshs/eslint-config/blob/master/LICENSE)

## Features

- Double quotes, with semi.
- Format with Prettier.
- Sort imports, `package.json`, `tsconfig.json`...
- Reasonable defaults, best practices, only one line of config.
- Designed to work with TypeScript out-of-box.
- Support JSON(5), YAML, TOML, Markdown...
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Ignores common files like `dist`, `node_modules`, `coverage`, and files in `.gitignore`.
- Optional [React](https://react.dev/), [NextJs](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [TanStack Query](https://tanstack.com/query/) support.
- Requires ESLint v9.5.0+.

> [!IMPORTANT]
> Since v2.2.0, this config is rewritten to the new [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), check the [release note](https://github.com/dkshs/eslint-config/releases/tag/v2.2.0) for more details.
>
> Since v3.0.0, ESLint v9.5.0+ is now required.

## Usage

1. Install the dependencies:

```bash
npm i -D eslint @dkshs/eslint-config
```

> Require Node.js >= 18.18, and ESLint >= 9.5.0.

2. Create `eslint.config.mjs` in your project root:

```mjs
// eslint.config.mjs
import { dkshs } from "@dkshs/eslint-config";

export default dkshs(
  // Features: it'll detect installed dependency and enable necessary features automatically
  {
    prettier: true,
    markdown: true,
    react: true, // auto detection
    nextjs: false, // auto detection
    tailwindcss: false, // auto detection
    reactQuery: false,  // auto detection
  },
  {
    /* your custom config */
  },
);
```

3. Add script for package.json:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support (auto fix on save)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```json
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "gql",
    "graphql",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

## Customization

Since v2.2, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

Normally you only need to import the `dkshs` preset:

```js
// eslint.config.js
import { dkshs } from "@dkshs/eslint-config";

export default dkshs();
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import { dkshs } from "@dkshs/eslint-config";

export default dkshs({
  // TypeScript, React, NextJs, TailwindCSS and TanStack Query are auto-detected,
  // you can also explicitly enable them:
  typescript: true,
  react: true,
  nextjs: true,
  tailwindcss: true,
  reactQuery: true,

  // Disable jsonc, yaml and toml support
  jsonc: false,
  yaml: false,
  toml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    "**/fixtures",
    // ...globs
  ],
});
```

The `dkshs` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import { dkshs } from "@dkshs/eslint-config";

export default dkshs(
  {
    // Configures for dkshs's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ["**/*.ts"],
    rules: {},
  },
  {
    rules: {},
  },
);
```

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts`. We also provided the overrides options in each integration to make it easier:

```js
// eslint.config.js
import { dkshs } from "@dkshs/eslint-config";

export default dkshs({
  typescript: {
    overrides: {
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  yaml: {
    overrides: {
      // ...
    },
  },
});
```

### Optional Configs

We provide some optional configs for specific use cases, that we don't include their dependencies by default.
> React, Next.js and Tailwind CSS have their dependencies by default.

#### TanStack Query

To enable TanStack Query support, you need to have the package installed or explicitly enable it:

```js
// eslint.config.js
import { dkshs } from "@dkshs/eslint-config";

export default dkshs({
  reactQuery: true,
});
```

To work, the [`@tanstack/eslint-plugin-query`](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query) package must be installed:

```bash
npm i -D @tanstack/eslint-plugin-query
```

> Require @tanstack/eslint-plugin-query >= 5.50.0

## References and inspirations

- [@antfu/eslint-config](https://github.com/antfu/eslint-config) - Anthony's ESLint config preset.
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config) - A opinionated ESLint config preset.

## License

This project is licensed under the **MIT** License - see the [LICENSE](./LICENSE) file for details
