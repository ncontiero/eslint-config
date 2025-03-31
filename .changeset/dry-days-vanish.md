---
"@dkshs/eslint-config": major
---

refactor!: rename project from `dkshs` to `ncontiero`

- Config names and config initializer have been changed to `ncontiero`:

```diff
-import { dkshs } from "@dkshs/eslint-config";
+import { ncontiero } from "@dkshs/eslint-config";

-export default dkshs();
+export default ncontiero();
```

- This package will be deprecated in favor of `@ncontiero/eslint-config`, to migrate, simply run the following command with your package manager and use the configuration shown above: `npm rm @dkshs/eslint-config && npm i -D @ncontiero/eslint-config`
