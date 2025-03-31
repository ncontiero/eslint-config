import type { FlatConfigItem, OptionsConfig } from "../src/types";
import fs from "node:fs/promises";
import { join, resolve } from "node:path";
import { execa } from "execa";
import { glob } from "tinyglobby";
import { afterAll, beforeAll, it } from "vitest";

beforeAll(async () => {
  await fs.rm("_fixtures", { recursive: true, force: true });
});
afterAll(async () => {
  await fs.rm("_fixtures", { recursive: true, force: true });
});

function runWithConfig(
  name: string,
  configs: OptionsConfig,
  ...items: FlatConfigItem[]
) {
  it.concurrent(
    name,
    async ({ expect }) => {
      const from = resolve("fixtures/input");
      const output = resolve("fixtures/output", name);
      const target = resolve("_fixtures", name);

      await fs.cp(from, target, {
        recursive: true,
        filter: (src: string) => {
          return !src.includes("node_modules");
        },
      });
      await fs.writeFile(
        join(target, "eslint.config.js"),
        `
          // @eslint-disable
          import { ncontiero } from "@ncontiero/eslint-config";
          
          export default ncontiero(
            ${JSON.stringify(configs)},
            ...${JSON.stringify(items) ?? []},
          );
        `,
      );

      await execa("npx", ["eslint", ".", "--fix"], {
        cwd: target,
        stdio: "pipe",
      });

      const files = await glob("**/*", {
        ignore: ["node_modules", "eslint.config.js"],
        cwd: target,
      });

      await Promise.all(
        files.map(async (file) => {
          const content = await fs.readFile(join(target, file), "utf-8");
          const source = await fs.readFile(join(from, file), "utf-8");
          const outputPath = join(output, file);
          if (content === source) {
            fs.rm(outputPath, { force: true });
            return;
          }
          await expect.soft(content).toMatchFileSnapshot(join(output, file));
        }),
      );
    },
    35_000,
  );
}

runWithConfig("js", { typescript: false });
runWithConfig("all", { typescript: true });
runWithConfig("tab-single-quotes", {
  typescript: true,
  prettier: {
    singleQuote: true,
    useTabs: true,
  },
});

runWithConfig(
  "ts-override",
  {
    typescript: true,
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
);

runWithConfig("with-prettier", {
  typescript: true,
  prettier: true,
});

runWithConfig("no-markdown-with-prettier", {
  prettier: true,
  markdown: false,
});
