<div align="center">

# @dkshs/eslint-config

ESLint configuration.

[![Version](https://img.shields.io/npm/v/@dkshs/eslint-config)](https://www.npmjs.com/package/@dkshs/eslint-config) [![License](https://img.shields.io/badge/licence-MIT-blue)](https://github.com/dkshs/eslint-config/blob/master/LICENSE)

</div>

## Features

- Double quotes, with semi
- Format with Prettier
- Sort imports, `package.json`, `tsconfig.json`...
- Reasonable defaults, best practices, only one line of config
- Designed to work with TypeScript, JSX out-of-box
- Lints also for json, yaml, toml, markdown
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Optional [React](https://react.dev/), [NextJs](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/) support

> [!IMPORTANT]
> Since v2.0.0, this config is rewritten to the new [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), check the [release note](https://github.com/dkshs/eslint-config/releases/tag/v2.0.0) for more details.

## Install

```bash
npm i -D @dkshs/eslint-config
```

Require Node.js >= 18.18, and ESLint >= 8.56.0.

## Usage

```mjs
// eslint.config.js
import { dkshs } from "@dkshs/eslint-config"

export default dkshs(
  [
    /* your custom config */
  ],
  // Features: it'll detect installed dependency and enable necessary features automatically
  {
    prettier: true,
    markdown: true,
    react: true, // auto detection
    nextjs: false, // auto detection
    tailwindcss: false, // auto detection
  },
)
```

### Presets

```js
// eslint.config.js
import {
  presetJavaScript, // Ignore common files and include javascript support
  presetJsonc, // Includes basic json(c) file support and sorting json keys
  presetLangsExtensions, // Includes markdown, yaml, toml + `presetJsonc` support
  presetBasic, // Includes `presetJavaScript` and typescript support

  // Includes
  // - `presetBasic` (JS+TS) support
  // - `presetLangsExtensions` (markdown, yaml, toml, jsonc) support
  // - React support
  // - NextJs support
  // - TailwindCSS support
  // - Prettier support
  presetAll,
} from "@dkshs/eslint-config"

export default presetAll
```

See [presets.ts](./src/presets.ts) for more details.

## License

This project is licensed under the **MIT** License - see the [LICENSE](./LICENSE) file for details
