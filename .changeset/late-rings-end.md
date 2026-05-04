---
"@ncontiero/eslint-config": major
---

feat!: extract JSX a11y config into dedicated JSX option
- If you want to continue using the a11y plugin, you will need to activate it manually:

```diff
import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero(
  {
    react: true,
+   jsx: {
+     a11y: true,
+   },
  },
);
```
