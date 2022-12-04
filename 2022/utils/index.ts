import { readFileSync } from "fs-extra";

export const getFileContent = (fileDir: string) => {
  const content = readFileSync(fileDir, "utf-8");
  return content.split(/\r?\n/);
};
