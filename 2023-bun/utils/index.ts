import { readFileSync } from 'fs'

export const logResults = (
  resPt1?: string | number,
  resPt2?: string | number
) => {
  console.log(`~~ Results ~~`);
  if (resPt1) console.log("Part 1: ", resPt1);
  if (resPt2) console.log("Part 2: ", resPt2);
};

export const getFileContentAsync = async (
  dayNumber: string | number,
  fileName: string = "input.txt"
) => {
  const file = Bun.file(`day${dayNumber}/${fileName}`);
  const content = await file.text();
  return content.split(/\r?\n/);
};

export const getFileContent = (
  path: string,
  fileName: string = "input.txt"
) => {
  const content = readFileSync(
    `${path}/${fileName}`,
    "utf-8"
  );
  return content.split(/\r?\n/);
};

export const getFileMatrix = (path: string, fileName?: string) =>
  getFileContent(path, fileName).map(line => line.split(""))

export const stringArrayToNumberArray = (stringArr: string[]) => {
  return stringArr.map((val) => Number.parseInt(val));
};
