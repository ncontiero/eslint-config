import type { FlatConfigItem } from "../types";
import createCommand from "eslint-plugin-command/config";

export function command(): FlatConfigItem[] {
  return [
    {
      ...createCommand(),
      name: "ncontiero/command/rules",
    },
  ];
}
