import fs from "node:fs/promises";
import { flatConfigsToRulesDTS } from "eslint-typegen/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { ncontiero } from "../src";

const configs = await ncontiero({
  plugins: {
    "": {
      rules: Object.fromEntries(builtinRules.entries()),
    },
  },
  react: true,
  nextjs: true,
  tailwindcss: true,
  reactQuery: true,
});

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(" | ")}
`;

await fs.writeFile("src/typegen.d.ts", dts);
