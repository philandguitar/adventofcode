import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const lines = readFileByLine(import.meta.dirname, "example");
  return lines.length;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname, "example");
  return lines.length;
};
