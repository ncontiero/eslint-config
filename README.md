<div align="center">

# @dkshs/eslint-config

ESLint configuration.

[![Version](https://img.shields.io/npm/v/@dkshs/eslint-config)](https://www.npmjs.com/package/@dkshs/eslint-config) [![License](https://img.shields.io/badge/licence-MIT-blue)](https://github.com/ShadowsS01/eslint-config/LICENSE)

</div>

## Whats included?

- Standard config base;
- React plugin;
- React Hooks plugin;
- JSX a11y plugin;
- Prettier;

## Setup

1. Install the dependencies

```bash
npm i -D eslint @dkshs/eslint-config
```

2. Create a `.eslintrc.json` file extending the config:

- For React projects:

```json
{
  "extends": "@dkshs/eslint-config/react"
}
```

- For Node.js projects:

```json
{
  "extends": "@dkshs/eslint-config/node"
}
```

> You can also use a `.eslintrc.js` or `.eslintrc` instead of JSON if you prefer.
