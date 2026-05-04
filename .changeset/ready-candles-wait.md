---
"@ncontiero/eslint-config": major
---

feat!: add standalone tanstack query config
- The `reactQuery` option has been changed to `tanstackQuery`:

```diff
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero(
  {
    react: true,
-   reactQuery: true,
+   tanstackQuery: true,
  },
);
```
