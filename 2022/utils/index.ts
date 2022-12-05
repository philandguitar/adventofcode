import { readFileSync } from "fs-extra";

export const logResults = (
  dayNumber: number,
  resPt1?: string,
  resPt2?: string
) => {
  console.log(`~~ Day ${dayNumber} ~~`);
  if (resPt1) console.log("Part 1: ", resPt1);
  if (resPt2) console.log("Part 2: ", resPt2);
};

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

export const stringArrayToNumberArray = (stringArr: string[]) => {
  return stringArr.map((val) => Number.parseInt(val));
};
