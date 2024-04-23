# @dkshs/eslint-config

## 2.3.0

### Minor Changes

- [`aa68385`](https://github.com/dkshs/eslint-config/commit/aa6838573c9614caeaf9e44a171489286ed76469) - feat: disable `import/no-default-export` rule for middleware file in next.js

### Patch Changes

- [`3903be1`](https://github.com/dkshs/eslint-config/commit/3903be184db38d4178460d23a41b7006c83a4091) - fix: remove deprecated rule `jsx-a11y/no-onchange`

- [`29c4ee6`](https://github.com/dkshs/eslint-config/commit/29c4ee6a349ed987ab2059880e5008248229c5ee) - fix: remove deprecated rule `jsx-a11y/label-has-for`

- [`0faafcb`](https://github.com/dkshs/eslint-config/commit/0faafcbcd30c891e3c1d6c57d92f1000725d24b6) - fix: rule name `react/prop-types`

## 2.2.0

### Major Changes

- [#1](https://github.com/dkshs/eslint-config/pull/1) [`5b197e8`](https://github.com/dkshs/eslint-config/commit/5b197e8df4e1f3064f622884fe44667e1ce1eba7) - feat: migrate to eslint flat configuration

  - Use [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), users need to [migrate to the new config style as well](/README.md#usage)
  - Requires ESLint v8

### Minor Changes

- [`f2601a5`](https://github.com/dkshs/eslint-config/commit/f2601a585e282bb6c056a9d7aa6131814de149ba) - chore: disable `toml/array-element-newline` rule

- [`dd00efb`](https://github.com/dkshs/eslint-config/commit/dd00efb1df187d14afee3a1826a0191c38bbc2f6) - feat: improve `jsonc` config and use prettier values for customizations

- [`77dcbb5`](https://github.com/dkshs/eslint-config/commit/77dcbb51ef8ac5fcbcc302185f16ee7e0402b2d3) - feat: improve `yml` config

### Patch Changes

- [`a945db0`](https://github.com/dkshs/eslint-config/commit/a945db0d5624e3964a5a7da2441265f63bb4bd58) - docs: fix plugin name in example and increase migration version from 2.0 to 2.1

- [`7097e19`](https://github.com/dkshs/eslint-config/commit/7097e195b3b4eecdf021901c0d58dfe36aad1e55) - fix: pass style options to functions

- [`537cba6`](https://github.com/dkshs/eslint-config/commit/537cba61903e28e20ff769c0223056ab6c962133) - chore(deps): remove eslint-config-prettier

- [`5d72d0e`](https://github.com/dkshs/eslint-config/commit/5d72d0eae6b1e113323103538c9caa2fdfee718b) - chore: update config name `sortKeys` to `perfectionist`
