# @ncontiero/eslint-config

Nicolas's ESLint config preset for JavaScript, TypeScript, and Prettier.

[![Version](https://img.shields.io/npm/v/@ncontiero/eslint-config)](https://www.npmjs.com/package/@ncontiero/eslint-config)
[![License](https://img.shields.io/badge/licence-MIT-blue)](https://github.com/ncontiero/eslint-config/blob/master/LICENSE)

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
- Requires ESLint v9.20.0+.

## Usage

1. Install the dependencies:

```bash
npm i -D eslint @ncontiero/eslint-config
```

> Require Node.js >= 20.11.0, and ESLint >= 9.20.0.

2. Create `eslint.config.mjs` in your project root:

```mjs
// eslint.config.mjs
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero(
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

Normally you only need to import the `ncontiero` preset:

```js
// eslint.config.js
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero();
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
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

The `ncontiero` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero(
  {
    // Configures for ncontiero's config
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
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
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
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
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
