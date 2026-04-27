# @ncontiero/eslint-config

[![Version](https://img.shields.io/npm/v/@ncontiero/eslint-config?color6C47FF)](https://www.npmjs.com/package/@ncontiero/eslint-config)
[![License](https://img.shields.io/badge/licence-MIT-6C47FF)](https://github.com/ncontiero/eslint-config/blob/master/LICENSE)

Nicolas's ESLint config preset for JavaScript, TypeScript, and Prettier.

## Features

- Format with Prettier.
- Reasonable defaults, best practices, only one line of config.
- Designed to work with TypeScript out-of-box.
- Support JSON(5), YAML, TOML, Markdown, HTML with [HTML Eslint](https://html-eslint.org/).
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files), compose easily!
- Sort imports, `package.json`, `tsconfig.json`...
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

export default ncontiero();
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

### Plugins Renaming

Since flat config requires us to explicitly provide the plugin names (instead of the mandatory convention from npm package name), we renamed some plugins to make the overall scope more consistent and easier to write.

| New Prefix | Original Prefix        | Source Plugin                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `ts/*`     | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `react/*`  | `@eslint-react/*`      | [@eslint-react/eslint-plugin](https://github.com/Rel1cx/eslint-react)                      |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

This preset will automatically rename the plugins also for your custom configs. You can use the original prefix to override the rules directly, but the TypeScript will complain about the unknown rules, so you need to use the new prefix instead.

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts`. We also provided the overrides options in each integration to make it easier:

```js
// eslint.config.js
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  typescript: {
    overrides: {
      "ts/consistent-type-definitions": ["error", "interface"],
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

### Optional Rules

This config also provides some optional plugins/rules for extended usage.

#### `command`

Powered by [`eslint-plugin-command`](https://github.com/antfu/eslint-plugin-command). It is not a typical rule for linting, but an on-demand micro-codemod tool that triggers by specific comments.

For a few triggers, for example:

- `/// to-function` - converts an arrow function to a normal function
- `/// to-arrow` - converts a normal function to an arrow function
- `/// to-for-each` - converts a for-in/for-of loop to `.forEach()`
- `/// to-for-of` - converts a `.forEach()` to a for-of loop
- `/// keep-sorted` - sorts an object/array/interface
- ... etc. - refer to the [documentation](https://github.com/antfu/eslint-plugin-command#built-in-commands)

You can add the trigger comment one line above the code you want to transform, for example (note the triple slash):

<!-- eslint-skip -->

```ts
/// to-function
const foo = (msg: string): void => {
  console.log(msg);
};
```

Will be transformed to this when you hit save with your editor or run `eslint --fix`:

```ts
function foo(msg: string): void {
  console.log(msg);
}
```

The command comments are usually one-off and will be removed along with the transformation.

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
});
```

## References and inspirations

- [@antfu/eslint-config](https://github.com/antfu/eslint-config) - Anthony's ESLint config preset.
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config) - A opinionated ESLint config preset.

## License

This project is licensed under the **MIT** License - see the [LICENSE](./LICENSE) file for details
