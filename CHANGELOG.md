# @dkshs/eslint-config

## 2.7.2

### Patch Changes

- [#127](https://github.com/dkshs/eslint-config/pull/127) [`539fe0f`](https://github.com/dkshs/eslint-config/commit/539fe0f449e6b34a58c46e8cadc2b4e5b2d1fd46) - chore(deps): update eslint-plugin-perfectionist to v3

- [`efb2b59`](https://github.com/dkshs/eslint-config/commit/efb2b59ed48f3ce6d8c2df8c373308696d335b1a) - chore(deps): update eslint types to v9

## 2.7.1

### Patch Changes

- [#111](https://github.com/dkshs/eslint-config/pull/111) [`3575d65`](https://github.com/dkshs/eslint-config/commit/3575d658e32b39745aa8cd603680cfcf00622dd6) - chore(deps): update eslint-plugin-import-x to v3

## 2.7.0

### Minor Changes

- [`1c9ea59`](https://github.com/dkshs/eslint-config/commit/1c9ea59944aa06222f832231192fd77cc652ce98) - feat: add nvim support for `isInEditor`

### Patch Changes

- [`5fa54c8`](https://github.com/dkshs/eslint-config/commit/5fa54c89a8e9680bfee6ab94a59ab9fcf23a359b) - chore: remove module declaration `eslint-plugin-prettier`

## 2.6.1

### Patch Changes

- [#83](https://github.com/dkshs/eslint-config/pull/83) [`d9f2bd8`](https://github.com/dkshs/eslint-config/commit/d9f2bd8554f49941e43ed4681fd900f3f9030ee8) - chore(deps): update eslint-plugin-unicorn to v54

- [`09c1c2a`](https://github.com/dkshs/eslint-config/commit/09c1c2a2780d3dd3b5b8c375db1f95288f1d08f9) - fix(rule): disable `unicorn/prefer-top-level-await`

## 2.6.0

### Minor Changes

- [`935cfc5`](https://github.com/dkshs/eslint-config/commit/935cfc5fc4985ed9b761839fefbd120d2e7ceed6) - feat: sort `isolatedDeclarations`

## 2.5.1

### Patch Changes

- [#54](https://github.com/dkshs/eslint-config/pull/54) [`ab3b7a1`](https://github.com/dkshs/eslint-config/commit/ab3b7a13217932e7b314087e56c248d4267971ab) - chore(deps): update eslint-plugin-unused-imports to v4

## 2.5.0

### Minor Changes

- [`c9646f8`](https://github.com/dkshs/eslint-config/commit/c9646f88b3e5f2ea0e032499939768ee242b56c4) - feat: enable `unicorn/consistent-empty-array-spread` rule

### Patch Changes

- [`705c189`](https://github.com/dkshs/eslint-config/commit/705c189b9ba3437300c2e000c77a2e21dad12b73) - chore: update plugin imports

## 2.4.0

### Minor Changes

- [`673b2e5`](https://github.com/dkshs/eslint-config/commit/673b2e5a73026ef2d41feada1beb7149b22c6c74) - feat: add `eslint-plugin-command`

### Patch Changes

- [#24](https://github.com/dkshs/eslint-config/pull/24) [`c3d66d4`](https://github.com/dkshs/eslint-config/commit/c3d66d45c6459e1b7dea9b65002e4ef1b9bf52e4) - chore(deps): update eslint-plugin-markdown to v5

## 2.3.3

### Patch Changes

- [`fc6d412`](https://github.com/dkshs/eslint-config/commit/fc6d412c4de0bf3c76b9eedc724505ae37bbedb8) - fix: order of options in the `ìmport/order` rule

## 2.3.2

### Patch Changes

- [`6186afe`](https://github.com/dkshs/eslint-config/commit/6186afe4f12b78f4efd7da33904f8fba18867cf1) - fix: improve `import/order` rule options

## 2.3.1

### Patch Changes

- [`4a34641`](https://github.com/dkshs/eslint-config/commit/4a34641ac48b5ffff3f4783830c300fbd343cbfc) - fix: disable `react/boolean-prop-naming` rule

- [`98331a9`](https://github.com/dkshs/eslint-config/commit/98331a9a33f8183f2496f7ebcbafeadcc788a69e) - fix: disable rule `yml/no-empty-mapping-value`

- [`e865872`](https://github.com/dkshs/eslint-config/commit/e865872361a65914c58877211547c5ff3403d253) - fix: remove options from rule `jsx-a11y/label-has-associated-control`

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
