import { readFileSync } from "fs-extra";

export const getFileContent = (
  dayNumber: string,
  fileName: string = "input.txt"
) => {
  const content = readFileSync(
    `challenges/day${dayNumber}/${fileName}`,
    "utf-8"
  );
  return content.split(/\r?\n/);
};
